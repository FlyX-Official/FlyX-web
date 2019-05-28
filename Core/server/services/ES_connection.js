const elasticsearch = require('elasticsearch');

// Establish connection to elasticsearch cluster on AWS
exports.client = new elasticsearch.Client({
    host: 'https://search-flyx-pjpbplak6txrmnjlcrzwekexy4.us-east-2.es.amazonaws.com',
    log: 'error'
  });
  
