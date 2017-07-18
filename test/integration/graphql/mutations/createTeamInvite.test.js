import {request, requestWithPatching, getToken} from '../utils';

describe('Graphql::mutations::createTeamInvite', () => {

  const createProject = (token) => {
    //language=GraphQL
    const query = `
      mutation createProject ($input: CreateProjectInput!) {
        createProject(input: $input) {
          project {
            id,
            name
          },
          team {
            id,
            name
          },
          membership {
            id
          }
        }
      }`;

    const projectName = 'crossbow2';

    return request(query, {
      input: {
        name: projectName,
      },
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  test('Should create a project', async () => {
    const token = await getToken();

    const {data: {createProject: {team}}} = await createProject(token);

    //language=GraphQL
    const query = `
      mutation  createTeamInvite ($input: CreateTeamInviteInput!) {
        createTeamInvite(input: $input) {
          teamInvite {
            id,
            token,
            expiresIn,
            uses
          }
        }
      }`;


    const results = await requestWithPatching(query, {
      input: {
        team: team.id,
      },
    }, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(results.error).toBeUndefined();

    const {data: {createTeamInvite}} = results;

    expect(createTeamInvite).toMatchObject({
      teamInvite: {
        id       : expect.any(Number),
        token    : expect.any(String),
        expiresIn: expect.any(Number),
        uses     : 0,
      },
    });

    expect(createTeamInvite.teamInvite.expiresIn).toBeGreaterThanOrEqual(-1);
    expect(createTeamInvite.teamInvite.token.length).toBeGreaterThanOrEqual(1);
  });
});
