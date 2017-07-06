import {request, requestWithPatching} from '../../../utils';

describe('Graphql::mutations::signup', () => {
  test('Should create a user', async () => {
    //language=GraphQL
    const query = `
      mutation signup ($input: SignupInput!){
        signup (input: $input) {
          user {
            id,
            username
          }
        }
      }`;

    const username  = 'Heisenberg';
    const password  = 'Test';
    const variables = {input: {username, password}};

    const results = await requestWithPatching(query, variables);

    expect(results.errors).toBeUndefined();

    const {data: {signup: {user}}} = results;

    expect(user).toMatchObject({
      username,
      id: expect.any(Number)
    });
  });

  test('Should fail when asked for password', async () => {
    //language=GraphQL
    const query = `
      mutation {
        signup (input: {
          username: "Don Antonio",
          password: "I sell meth"
        }) {
          user {
            password
          }
        }
      }`;

    const results = await request(query);

    expect(results.errors).toBeDefined();
  });
});
