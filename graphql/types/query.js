const {GraphQLObjectType} = require('graphql');
const UserType            = require('./user');

const QueryType = new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    viewer: {
      type   : UserType,
      resolve: (_, _args, context) => {
        console.log(context)
      }
    }
  })
});

module.exports = QueryType;
