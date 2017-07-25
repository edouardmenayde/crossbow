import {GraphQLObjectType} from 'graphql';
import servicesForUser from './queries/servicesForUser';
import services from './queries/services';
import me from './queries/me';

export default new GraphQLObjectType({
  name  : 'Query',
  fields: () => ({
    servicesForUser,
    services,
    me,
  }),
});
