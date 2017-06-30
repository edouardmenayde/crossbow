const {GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType, GraphQLList, GraphQLID} = require('graphql');
const User                                                                                = require('./User');
const Service                                                                             = require('./Service');
const ServiceLink                                                                         = require('./ServiceLink');

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

/**
 * @TODO: implement auth
 */
const QueryType = new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    viewer         : {
      type: User
    },
    servicesForUser: {
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
    }
  })
});

module.exports = QueryType;
