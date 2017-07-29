import {GraphQLList} from 'graphql';
import withAuth from '../../lib/auth';

export default (typesManager) => {
  return typesManager.generateQuery({
    name         : 'ServicesForUser',
    payloadFields: () => ({
      services: {
        type: new GraphQLList(typesManager.types.get('Service')),
      },
    }),
    description  : "All service, containing whether it was link to one or multiple accounts, for the user",
    resolve      : withAuth(async (_, {}, {token, wetland}) => {
      const manager           = wetland.getManager();
      const ServiceRepository = manager.getRepository('Service');

      let services = await ServiceRepository.findForUserWithLinks({
        userID: token.user.id,
      });

      return {services};
    }),
  });
};

