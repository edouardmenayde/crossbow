import {GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt} from 'graphql';
import ServiceLink                                            from '../types/ServiceLink';
import withAuth from '../../lib/auth';

const LinkServiceInput = new GraphQLInputObjectType({
  name  : 'LinkServiceInput',
  fields: {
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
  }
});

const LinkServicePayload = new GraphQLObjectType({
  name  : 'LinkServicePayload',
  fields: {
    serviceLink: {
      type: ServiceLink
    }
  }
});

export default {
  name       : 'LinkService',
  description: 'Create or update a service link',
  type       : new GraphQLNonNull(LinkServicePayload),
  args       : {
    input: {
      type: new GraphQLNonNull(LinkServiceInput)
    }
  },
  resolve    : withAuth(async (_, {input}, context) => {
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

      return {serviceLink};
    }
    catch (error) {
      throw error;
    }
  })
};
