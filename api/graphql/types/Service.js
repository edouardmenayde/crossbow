import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';

export default new GraphQLObjectType({
  name       : 'Service',
  description: 'Service link contain resources to create a unique instance of the service owned by a user.',
  fields     : () => {
    const ServiceLink = require('./ServiceLink').default;

    return {
      id   : {
        type       : GraphQLInt,
        description: 'ID of the service'
      },
      name : {
        type       : GraphQLString,
        description: 'Name of the service'
      },
      links: {
        type: new GraphQLList(ServiceLink)
      }
    };
  }
});
