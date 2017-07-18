import {GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType, GraphQLList, GraphQLInt} from 'graphql';
import Service from '../types/Service';
import withAuth from '../../lib/auth';

const NAME = 'Services';

const input = new GraphQLInputObjectType({
  name  : NAME+ 'Input',
  fields: () => ({
    userID: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
});

const payload = new GraphQLObjectType({
  name  : NAME + 'Payload',
  fields: () => ({
    services: {
      type: new GraphQLList(Service)
    }
  })
});


export default {
  type       : payload,
  args       : {
    input: {
      type: input
    }
  },
  description: 'All service, containing whether it was link to one or multiple accounts, for the user',
  resolve    : withAuth(async (_, {}, {wetland}) => {
    const manager           = wetland.getManager();
    const ServiceRepository = manager.getRepository('Service');

    let services = await ServiceRepository.find();

    return {services};
  })
};
