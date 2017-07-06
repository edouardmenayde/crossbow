import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';

export default new GraphQLObjectType({
  name       : 'User',
  description: 'A user',
  fields     : () => {
    const ServiceLink = require('./ServiceLink').default;

    return {
      id      : {
        type       : GraphQLInt,
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
