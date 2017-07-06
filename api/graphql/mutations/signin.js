import {GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLString} from 'graphql';
import User                            from '../types/User';
import jwt from '../../utils/jwt';
import bcrypt from '../../utils/bcrypt';

const SigninInput = new GraphQLInputObjectType({
  name  : 'SigninInput',
  fields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

const SigninPayload = new GraphQLObjectType({
  name  : 'SigninPayload',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user : {
      type: User
    }
  }
});

export default {
  name   : 'Signin',
  args   : {
    input: {
      type: new GraphQLNonNull(SigninInput)
    }
  },
  type   : new GraphQLNonNull(SigninPayload),
  resolve: async (_, {input}, context) => {
    const {req} = context;

    const manager        = req.getManager();
    const User           = manager.getEntity('User');
    const UserRepository = manager.getRepository(User);

    try {
      let user = await UserRepository.findOne({username: input.username});

      if (!user) {
        return new Error('User could not be authenticated.');
      }

      let isPasswordCorrect = await bcrypt.compare(input.password, user.password);

      if (!isPasswordCorrect) {
        return new Error('User could not be authenticated.');
      }

      return {
        token: await jwt.encode({user}),
        user
      };
    }
    catch (error) {
      throw error;
    }
  }
};
