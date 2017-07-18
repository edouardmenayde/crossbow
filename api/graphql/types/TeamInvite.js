import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';
import GraphQLDate                                                 from 'graphql-date';

export default new GraphQLObjectType({
  name       : 'TeamInvite',
  description: 'An invitation to join a team.',
  fields     : () => {
    const Team = require('./Team').default;
    const User = require('./User').default;

    return {
      id       : {
        type       : GraphQLInt,
        description: 'ID of the invite'
      },
      createdAt: {
        type       : GraphQLDate,
        description: 'Date at which service was first linked.'
      },
      updatedAt: {
        type       : GraphQLDate,
        description: 'Date at which service link was first updated.'
      },
      token    : {
        type       : GraphQLString,
        description: 'Unique and (preferrably) hard to guess token used to identify the invite'
      },
      uses     : {
        type       : GraphQLInt,
        description: 'Uses'
      },
      expiresIn: {
        type       : GraphQLInt,
        description: 'Expiration of the token in seconds.'
      },
      team     : {
        type: Team
      },
      requestor: {
        type: User
      }
    };
  }
});
