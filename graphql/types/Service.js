const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = require('graphql');

module.exports = new GraphQLObjectType({
  name       : 'Service',
  description: 'Service link contain resources to create a unique instance of the service owned by a user.',
  fields     : () => {
    const ServiceLink = require('./ServiceLink');

    return {
      id   : {
        type       : GraphQLID,
        description: 'ID of the service'
      },
      name : {
        type       : GraphQLString,
        description: 'Name of the service'
      },
      tag : {
        type       : GraphQLString,
        description: 'Unique tag of the service'
      },
      links: {
        type: new GraphQLList(ServiceLink)
      }
    };
  }
});
