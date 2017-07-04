import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} from 'graphql';

export default new GraphQLObjectType({
  name       : 'User',
  description: 'A user',
  fields     : () => {
    const ServiceLink = require('./ServiceLink').default;

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
