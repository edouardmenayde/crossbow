import {GraphQLObjectType} from 'graphql';
import signup              from './mutations/signup';
import signin              from './mutations/signin';
import linkService         from './mutations/linkService';

export default new GraphQLObjectType({
  name  : 'Mutation',
  fields: {
    signup,
    signin,
    linkService
  }
});

