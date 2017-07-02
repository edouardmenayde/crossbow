const {GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt} = require('graphql');
const {mutationWithClientMutationId}                         = require('graphql-relay');
const User                                                   = require('../types/User');
const ServiceLink                                            = require('../types/ServiceLink');

module.exports = mutationWithClientMutationId({
  name               : 'LinkService',
  description        : 'Create or update a service link',
  inputFields        : {
    serviceLink : {
      type: GraphQLID
    },
    user        : {
      type: new GraphQLNonNull(GraphQLID)
    },
    service     : {
      type: new GraphQLNonNull(GraphQLID)
    },
    type        : {
      type: GraphQLString
    },
    accessToken : {
      type: GraphQLString
    },
    refreshToken: {
      type: GraphQLString
    },
    expiresIn   : {
      type: GraphQLInt
    }
  },
  outputFields       : {
    serviceLink: {
      type: ServiceLink
    }
  },
  mutateAndGetPayload: async (input, context) => {
    const {req}     = context;
    const {wetland} = req;

    const manager     = wetland.getManager();
    const populator   = wetland.getPopulator(manager);
    const ServiceLink = manager.getEntity('ServiceLink');

    try {

      if (input.serviceLink) {
        return new Error('Service link update not implemented');
      }

      let serviceLink = populator.assign(ServiceLink, input);

      await manager.persist(serviceLink).flush();

      return {
        serviceLink: serviceLink
      };
    }
    catch (error) {
      throw error;
    }
  }
});
