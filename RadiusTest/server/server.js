/* eslint-disable */
const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
const cors = require('cors');
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
});

client.ping({
    requestTimeout: 30000
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});
var testData;


app.post('/search', function (req, res) {

    var airportCode = req.body.query;
    var radius = req.body.radius;
    var response;
    console.log('Input Data: ' + airportCode + " " + radius);

    let geohash = getAirportGeohash(airportCode);

    Promise.resolve(geohash).then(geohash => {

        let airportsInRadius = getAirportsInRadius(radius, geohash);

        Promise.resolve(airportsInRadius).then(airportsInRadius => {
            res.send(airportsInRadius);
        })

    });

});

function getAirportGeohash(airportCode) {
    let body = {
        size: 100,
        from: 0,
        query: {
            match: {
                Combined: {
                    query: airportCode,
                    fuzziness: 0
                }
            }
        }
    }
    const elasticResults = client.search({
            index: 'vue-elastic',
            body: body,
            type: 'characters_list'
        })
        .then(results => {
            let geoHash = results.hits.hits[0]._source.location1;
            return geoHash;
        })
        .catch(err => {
            console.log(err)
        });
    return elasticResults;
}
function getAirportsInRadius(radius, geoHash) {
    let body = {
        size: 100,
        query: {
            bool: {
                must: {
                    match_all: {}
                },
                filter: {
                    geo_distance: {
                        distance: radius + "mi",
                        location: geoHash
                    }
                }
            }
        }
    }
    const elasticResults = client.search({
            index: 'upflights',
            body: body,
            type: ''
        })
        .then(results => {
            return results.hits.hits;
        })
        .catch(err => {
            console.log(err)
        });

    return elasticResults;

}

app.listen(app.get('port'), function () {
    console.log('Your node.js server is running on PORT: ', app.get('port'));
});