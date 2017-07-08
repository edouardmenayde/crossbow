import {GraphQLObjectType} from 'graphql';
import servicesForUser from './queries/servicesForUser';

export default new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    servicesForUser
  })
});
