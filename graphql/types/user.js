const {GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');

const UserType = new GraphQLObjectType({
  name       : 'User',
  description: 'A user',
  fields     : () => ({
    id  : {
      type       : GraphQLID,
      description: 'ID of the user'
    },
    username: {
      type       : GraphQLString,
      description: 'Name of the user'
    }
  }),
});

module.exports = UserType;
