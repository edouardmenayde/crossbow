import {request, requestWithPatching} from '../utils';

describe('Graphql::mutations::signup', () => {
  test('Should create a user', async () => {
    //language=GraphQL
    const query = `
      mutation signup ($input: SignupInput!){
        signup (input: $input) {
          user {
            id,
            username,
            createdAt,
            updatedAt
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
      id: expect.any(Number),
    });

    let createdAt = user.createdAt;
    let updatedAt = user.updatedAt;

    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();

    expect(() => new Date(createdAt)).not.toThrow();
    expect(() => new Date(updatedAt)).not.toThrow();
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
