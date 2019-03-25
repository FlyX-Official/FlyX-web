const elasticsearch = require('elasticsearch');

// Establish connection to elasticsearch cluster on AWS
exports.client = new elasticsearch.Client({
    host: 'https://search-flightsniffer-cvj2fdpizni6puckbeq3d5zjne.us-west-1.es.amazonaws.com',
    log: 'error'
  });
  
