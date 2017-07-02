const {GraphQLObjectType} = require('graphql');
const User                = require('./types/User');
const servicesForUser     = require('./queries/servicesForUser');

/**
 * @TODO: implement auth
 */
const QueryType = new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    viewer         : {
      type: User
    },
    servicesForUser: servicesForUser
  })
});

module.exports = QueryType;
