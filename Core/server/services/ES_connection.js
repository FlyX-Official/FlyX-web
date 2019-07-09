const elasticsearch = require('elasticsearch');

// Establish connection to elasticsearch cluster on AWS
exports.client = new elasticsearch.Client({
    host: process.env.ES_URI,
    log: 'error'
  });
  
