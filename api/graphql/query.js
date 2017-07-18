import {GraphQLObjectType} from 'graphql';
import servicesForUser from './queries/servicesForUser';
import services from './queries/services';

export default new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    servicesForUser,
    services
  })
});
