const {GraphQLNonNull, GraphQLString} = require('graphql');
const {mutationWithClientMutationId}  = require('graphql-relay');
const User                            = require('./User');

module.exports = mutationWithClientMutationId({
  name               : 'Signin',
  inputFields        : {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields       : {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },
    user : {
      type: User
    }
  },
  mutateAndGetPayload: async (input, context) => {
    const {req} = context;

    const manager        = req.getManager();
    const User           = manager.getEntity('User');
    const UserRepository = manager.getRepository(User);

    try {
      let user = await UserRepository.findOne({username: input.username});

      if (!user) {
        return new Error('User could not be authenticated.');
      }

      let isPasswordCorrect = await HashService.bcrypt.compare(input.password, user.password);

      if (!isPasswordCorrect) {
        return new Error('User could not be authenticated.')
      }

      return {
        token: CipherService.jwt.encodeSync({id: user.id}),
        user : user
      };
    }
    catch (error) {
      throw error;
    }
  }
});
