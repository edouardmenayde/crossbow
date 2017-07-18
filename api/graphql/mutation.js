import {GraphQLObjectType} from 'graphql';
import signup              from './mutations/signup';
import signin              from './mutations/signin';
import linkService         from './mutations/linkService';
import unlinkService       from './mutations/unlinkService';
import createProject       from './mutations/createProject';
import createTeamInvite from './mutations/createTeamInvite';

export default new GraphQLObjectType({
  name  : 'Mutation',
  fields: {
    signup,
    signin,
    linkService,
    unlinkService,
    createProject,
    createTeamInvite,
  },
});

