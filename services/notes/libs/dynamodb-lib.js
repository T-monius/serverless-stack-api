import AWS from "aws-sdk";

// Remove Hard coding of DynamoDB region; set in serverless.yml
// AWS.config.update({ region: "us-west-2"});
const client = new AWS.DynamoDB.DocumentClient();

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};