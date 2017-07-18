import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import GraphQLDate                                                 from 'graphql-date';

export default new GraphQLObjectType({
  name       : 'Project',
  description: 'A team and services.',
  fields     : () => {
    const Team    = require('./Team').default;
    const Service = require('./Service').default;

    return {
      id      : {
        type       : GraphQLInt,
        description: 'ID of the project',
      },
      createdAt: {
        type       : GraphQLDate,
        description: 'Date at which project was created.',
      },
      updatedAt: {
        type       : GraphQLDate,
        description: 'Date at which project was last updated.',
      },
      name    : {
        type       : GraphQLString,
        description: 'Name of the service',
      },
      team    : {
        type: Team,
      },
      services: {
        type: new GraphQLList(Service),
      },
    };
  },
});
