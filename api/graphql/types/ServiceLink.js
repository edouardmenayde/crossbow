import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLEnumType} from 'graphql';
import GraphQLDate                                                    from 'graphql-date';

export const ServiceLinkType = new GraphQLEnumType({
  name       : 'ServiceLinkType',
  description: 'Type of auth mechanism used.',
  values     : {
    OAUTH_1: {
      value: 'oauth1',
    },
    OAUTH_2: {
      values: 'oauth2',
    },
  },
});

export default new GraphQLObjectType({
  name       : 'ServiceLink',
  description: 'A service link',
  fields     : () => {
    const User    = require('./User').default;
    const Service = require('./Service').default;

    return {
      id          : {
        type       : GraphQLInt,
        description: 'ID of the service',
      },
      createdAt   : {
        type       : GraphQLDate,
        description: 'Date at which service was first linked.',
      },
      updatedAt   : {
        type       : GraphQLDate,
        description: 'Date at which service link was first updated.',
      },
      type        : {
        type: ServiceLinkType,
      },
      accessToken : {
        type       : GraphQLString,
        description: 'Token used to authenticate the user to the service.',
      },
      refreshToken: {
        type       : GraphQLString,
        description: 'Token used to get refresh the access token.',
      },
      expiresIn   : {
        type       : GraphQLInt,
        description: 'Integer representing the seconds before expiration of the access token.',
      },
      service     : {
        type: Service,
      },
      user        : {
        type: User,
      },
    };
  },
});
