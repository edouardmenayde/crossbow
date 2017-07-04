import {GraphQLObjectType} from 'graphql';
import User                from './types/User';
import servicesForUser from './queries/servicesForUser';

/**
 * @TODO: implement auth
 */
export default new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    viewer: {
      type: User
    },
    servicesForUser
  })
});
