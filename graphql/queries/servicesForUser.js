const {GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType, GraphQLList, GraphQLID} = require('graphql');
const Service                                                                             = require('../types/Service');
const ServiceLink                                                                         = require('../types/ServiceLink');

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


module.exports = {
  type       : ServicesForUserPayload,
  args       : {
    input: {
      type: ServicesForUserInput
    }
  },
  description: "All service, containing whether it was link to one or multiple accounts, for the user",
  resolve    : async (_, args, context) => {
    let {req}     = context;
    const {input} = args;

    // if (!req.user) {
    //   throw Error('Not authorized.');
    // }

    const wetland           = req.wetland;
    const manager           = wetland.getManager();
    const ServiceRepository = manager.getRepository('Service');

    try {
      let services = await ServiceRepository.find();

      return {
        services: services
      };
    } catch (error) {
      throw error;
    }
  }
};
