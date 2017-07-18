import {requestWithPatching} from '../../../utils';
import {getToken} from '../utils';

describe('Graphql::mutations::createProject', () => {

  test('Should create a project', async () => {
    const token = await getToken();

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

    const projectName = 'crossbow';

    const results = await requestWithPatching(query, {
      input: {
        name: projectName
      }
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    expect(results.errors).toBeUndefined();

    expect(results.data.createProject).toMatchObject({
      project   : {
        id  : expect.any(Number),
        name: projectName
      },
      team      : {
        id  : expect.any(Number),
        name: null
      },
      membership: {
        id: expect.any(Number)
      }
    });

  });
});
