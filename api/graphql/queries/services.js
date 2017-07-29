import {GraphQLList} from 'graphql';
import withAuth from '../../lib/auth';

export default (typesManager) => {
  return typesManager.generateQuery({
    name         : 'Services',
    payloadFields: () => ({
      services: {
        type: new GraphQLList(typesManager.types.get('Service')),
      },
    }),
    description  : 'All services.',
    resolve      : withAuth(async (_, {}, {wetland}) => {
      const manager           = wetland.getManager();
      const ServiceRepository = manager.getRepository('Service');

      let services = await ServiceRepository.find();

      return {services};
    }),
  });
};
