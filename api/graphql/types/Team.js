import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';

export default new GraphQLObjectType({
  name       : 'Team',
  description: 'A group of users.',
  fields     : () => {
    const Project = require('./Project').default;
    const Membership = require('./Membership').default;

    return {
      id      : {
        type       : GraphQLInt,
        description: 'ID of the project'
      },
      name    : {
        type       : GraphQLString,
        description: 'Name of the project'
      },
      projects: {
        type: new GraphQLList(Project)
      },
      members : {
        type: new GraphQLList(Membership)
      }
    };
  }
});
