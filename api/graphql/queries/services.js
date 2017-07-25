import {GraphQLObjectType, GraphQLNonNull, GraphQLList} from 'graphql';
import Service from '../types/Service';
import withAuth from '../../lib/auth';

const NAME = 'Services';

const payload = new GraphQLObjectType({
  name  : NAME + 'Payload',
  fields: () => ({
    services: {
      type: new GraphQLList(Service),
    },
  }),
});


export default {
  type       : new GraphQLNonNull(payload),
  description: 'All service',
  resolve    : withAuth(async (_, {}, {wetland}) => {
    const manager           = wetland.getManager();
    const ServiceRepository = manager.getRepository('Service');

    let services = await ServiceRepository.find();

    return {services};
  }),
};
