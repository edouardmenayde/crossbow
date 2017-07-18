import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import GraphQLDate                                                 from 'graphql-date';

export default new GraphQLObjectType({
  name       : 'User',
  description: 'A user',
  fields     : () => {
    const ServiceLink = require('./ServiceLink').default;
    const Membership  = require('./Membership').default;
    const TeamInvite  = require('./TeamInvite').default;

    return {
      id         : {
        type       : GraphQLInt,
        description: 'ID of the user'
      },
      username   : {
        type       : GraphQLString,
        description: 'Name of the user'
      },
      createdAt  : {
        type       : GraphQLDate,
        description: 'Date at which service was first linked.'
      },
      updatedAt  : {
        type       : GraphQLDate,
        description: 'Date at which service link was first updated.'
      },
      teamInvites: {
        type: new GraphQLList(TeamInvite)
      },
      links      : {
        type: new GraphQLList(ServiceLink)
      },
      memberships: {
        type: new GraphQLList(Membership)
      }
    };
  }
});
