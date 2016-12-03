var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../gql-schema/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
