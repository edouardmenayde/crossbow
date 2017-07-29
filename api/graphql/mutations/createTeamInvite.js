import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import withAuth from '../../lib/auth';

import teamInviteService from '../../service/teamInviteService';

const NAME = 'CreateTeamInvite';


export default (typesManager) => {
  const input = new GraphQLInputObjectType({
    name  : NAME + 'Input',
    fields: () => ({
      team: {
        type       : new GraphQLNonNull(GraphQLInt),
        description: 'Team id.',
      },
    }),
  });

  const payload = new GraphQLObjectType({
    name  : NAME + 'Payload',
    fields: () => ({
      teamInvite: {
        type: typesManager.types.get('TeamInvite'),
      },
    }),
  });

  return {
    name       : NAME,
    description: 'Create an invitation to a team',
    type       : new GraphQLNonNull(payload),
    args       : {
      input: {
        type: new GraphQLNonNull(input),
      },
    },
    /**
     * @withAuth
     */
    resolve    : withAuth(teamInviteService.create),
  };
}
