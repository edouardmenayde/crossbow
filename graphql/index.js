const {GraphQLSchema} = require('graphql');
const QueryType       = require('./query');
const MutationType    = require('./mutation');

const Schema = new GraphQLSchema({
  query   : QueryType,
  mutation: MutationType
});

module.exports = Schema;
