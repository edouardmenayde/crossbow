const {GraphQLSchema} = require('graphql');
const QueryType       = require('./types/query');
const MutationType    = require('./types/mutation');

const Schema = new GraphQLSchema({
  query   : QueryType,
  mutation: MutationType
});

module.exports = Schema;
