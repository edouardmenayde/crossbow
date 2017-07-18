import {GraphQLObjectType, GraphQLInt} from 'graphql';

export default new GraphQLObjectType({
  name       : 'Membership',
  description: 'A user with roles belonging to a team.',
  fields     : () => {
    const Team = require('./Team').default;
    const User = require('./User').default;

    return {
      id  : {
        type       : GraphQLInt,
        description: 'ID of the membership'
      },
      user: {
        type: User
      },
      team: {
        type: Team
      }
    };
  }
});
