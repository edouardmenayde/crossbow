import {GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import ServiceLink                                            from '../types/ServiceLink';
import withAuth from '../../lib/auth';

const LinkServiceInput = new GraphQLInputObjectType({
  name  : 'LinkServiceInput',
  fields: {
    service     : {
      type: new GraphQLNonNull(GraphQLInt),
    },
    type        : {
      type: GraphQLString,
    },
    accessToken : {
      type: GraphQLString,
    },
    refreshToken: {
      type: GraphQLString,
    },
    expiresIn   : {
      type: GraphQLInt,
    },
  },
});

const LinkServicePayload = new GraphQLObjectType({
  name  : 'LinkServicePayload',
  fields: {
    serviceLink: {
      type: ServiceLink,
    },
  },
});

export default {
  name       : 'LinkService',
  description: 'Create a service link',
  type       : new GraphQLNonNull(LinkServicePayload),
  args       : {
    input: {
      type: new GraphQLNonNull(LinkServiceInput),
    },
  },
  resolve    : withAuth(async (_, {input}, {wetland, token}) => {
    const manager     = wetland.getManager();
    const populator   = wetland.getPopulator(manager);
    const ServiceLink = manager.getEntity('ServiceLink');

    try {
      input.user = token.user.id;

      let serviceLink = populator.assign(ServiceLink, input);

      await manager.persist(serviceLink).flush();

      return {serviceLink};
    }
    catch (error) {
      throw error;
    }
  }),
};
