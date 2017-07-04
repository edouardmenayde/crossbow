import {GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType, GraphQLList, GraphQLID} from 'graphql';
import Service from '../types/Service';

const ServicesForUserInput = new GraphQLInputObjectType({
  name  : 'ServicesForUserInput',
  fields: () => ({
    userID: {
      type: new GraphQLNonNull(GraphQLID)
    }
  })
});

const ServicesForUserPayload = new GraphQLObjectType({
  name  : 'ServicesForUserPayload',
  fields: () => ({
    services: {
      type: new GraphQLList(Service)
    }
  })
});


export default {
  type       : ServicesForUserPayload,
  args       : {
    input: {
      type: ServicesForUserInput
    }
  },
  description: "All service, containing whether it was link to one or multiple accounts, for the user",
  resolve    : async (_, {input}, context) => {
    let {req}     = context;

    if (!req.token) {
      throw Error('Not authorized.');
    }

    const wetland           = req.wetland;
    const manager           = wetland.getManager();
    const ServiceRepository = manager.getRepository('Service');

    let services = await ServiceRepository.find();

    return {services};
  }
};
