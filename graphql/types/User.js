const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = require('graphql');

module.exports = new GraphQLObjectType({
  name       : 'User',
  description: 'A user',
  fields     : () => {
    const ServiceLink = require('./ServiceLink');

    return {
      id      : {
        type       : GraphQLID,
        description: 'ID of the user'
      },
      username: {
        type       : GraphQLString,
        description: 'Name of the user'
      },
      links   : {
        type: new GraphQLList(ServiceLink)
      }
    };
  }
});
