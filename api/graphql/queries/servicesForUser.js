import {GraphQLObjectType, GraphQLNonNull, GraphQLList} from 'graphql';
import Service from '../types/Service';
import withAuth from '../../lib/auth';

const ServicesForUserPayload = new GraphQLObjectType({
  name  : 'ServicesForUserPayload',
  fields: () => ({
    services: {
      type: new GraphQLList(Service),
    },
  }),
});


export default {
  type       : new GraphQLNonNull(ServicesForUserPayload),
  description: "All service, containing whether it was link to one or multiple accounts, for the user",
  resolve    : withAuth(async (_, {}, {token, wetland}) => {
    const manager           = wetland.getManager();
    const ServiceRepository = manager.getRepository('Service');

    let services = await ServiceRepository.findForUserWithLinks({
      userID: token.user.id,
    });

    return {services};
  }),
};
