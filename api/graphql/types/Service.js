import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';

export default new GraphQLObjectType({
  name       : 'Service',
  description: 'Service link contain resources to create a unique instance of the service owned by a user.',
  fields     : () => {
    const ServiceLink = require('./ServiceLink').default;
    const Project     = require('./Project').default;

    return {
      id      : {
        type       : GraphQLInt,
        description: 'ID of the service',
      },
      name    : {
        type       : GraphQLString,
        description: 'Name of the service',
      },
      tag     : {
        type       : GraphQLString,
        description: 'Unique tag of the service',
      },
      links   : {
        type: new GraphQLList(ServiceLink),
      },
      projects: {
        type: new GraphQLList(Project),
      },
    };
  },
});
