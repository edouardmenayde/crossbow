const {GraphQLNonNull, GraphQLString} = require('graphql');
const {mutationWithClientMutationId}  = require('graphql-relay');
const User                            = require('../types/User');

module.exports = mutationWithClientMutationId({
  name               : 'Signup',
  inputFields        : {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields       : {
    user: {
      type: User
    }
  },
  mutateAndGetPayload: (input, context) => {
    const {req}     = context;
    const wetland   = req.wetland;
    const manager   = wetland.getManager();
    const populator = wetland.getPopulator(manager);
    const User      = manager.getEntity('User');

    let user = populator.assign(User, input);

    return manager.persist(user)
      .flush()
      .then(() => {
        return {
          user: user
        };
      });
  }
});
