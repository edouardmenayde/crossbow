import {GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLString} from 'graphql';
import User                            from '../types/User';

const SignupInput = new GraphQLInputObjectType({
  name  : 'SignupInput',
  fields: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

const SignupPayload = new GraphQLObjectType({
  name  : 'SignupPayload',
  fields: {
    user: {
      type: User,
    },
  },
});

export default {
  name       : 'Signup',
  description: 'Register a user',
  args       : {
    input: {
      type: new GraphQLNonNull(SignupInput),
    },
  },
  type       : SignupPayload,
  resolve    : (_, {input}, {wetland}) => {
    const manager   = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const User      = manager.getEntity('User');

    let user = populator.assign(User, input);

    return manager.persist(user)
      .flush()
      .then(() => {
        return {user};
      });
  },
};
