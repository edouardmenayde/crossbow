import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import withAuth from '../../lib/auth';
import Project from '../types/Project';
import Membership from '../types/Membership';
import Team from '../types/Team';

const NAME = 'CreateProject';

const input = new GraphQLInputObjectType({
  name  : NAME + 'Input',
  fields: () => ({
    name    : {
      type       : new GraphQLNonNull(GraphQLString),
      description: 'Name of the future team.',
    },
    services: {
      type       : new GraphQLList(GraphQLInt),
      description: 'List of services you want to add to the project',
    },
  }),
});

const payload = new GraphQLObjectType({
  name  : NAME + 'Payload',
  fields: () => ({
    project   : {
      type: Project,
    },
    membership: {
      type: Membership,
    },
    team      : {
      type: Team,
    },
  }),
});

export default {
  name       : NAME,
  description: 'Create a project',
  type       : new GraphQLNonNull(payload),
  args       : {
    input: {
      type: new GraphQLNonNull(input),
    },
  },
  /**
   * @withAuth
   *
   * Create a project.
   *
   * Steps :
   *
   * - Create the team
   * - Add current user as team leader
   * - Create project assigning it to the team
   */
  resolve    : withAuth(async (_, {input}, {wetland, token}) => {
    try {
      const manager   = wetland.getManager();
      const populator = wetland.getPopulator(manager);

      const Team       = manager.getEntity('Team');
      const Project    = manager.getEntity('Project');
      const Membership = manager.getEntity('Membership');

      let team = new Team;

      await manager.persist(team).flush();

      let membership = populator.assign(Membership, {
        user: token.user.id,
        team: team.id,
      });

      await manager.persist(membership).flush();

      let project = populator.assign(Project, {
        team: team.id,
        ...input,
      });

      await manager.persist(project).flush();

      return {
        project,
        membership,
        team,
      };
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }),
};
