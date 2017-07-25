import {GraphQLObjectType, GraphQLNonNull, GraphQLBoolean} from 'graphql';
import User from '../types/User';

const NAME = 'Me';

const payload = new GraphQLObjectType({
  name  : NAME + 'Payload',
  fields: () => ({
    user     : {
      type: User,
    },
    connected: {
      type: GraphQLBoolean,
    },
  }),
});

export default {
  type       : new GraphQLNonNull(payload),
  description: 'Get connected user payload.',
  resolve    : async (_, {}, {token}) => {
    if (!token) {
      return {connected: false};
    }

    return {user: token.user, connected: false};
  },
};
