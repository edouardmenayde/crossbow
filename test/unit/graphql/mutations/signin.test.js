import {request, requestWithPatching} from '../../../utils';
import jwt from '../../../../api/utils/jwt';

describe('Graphql::mutations::signin', () => {

  const username = 'Obama';
  const password = '123456789';

  const user = {username, password};

  beforeAll(async () => {
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

    await request(query, {
      input: user,
    });
  });

  test('Should signin a user', async () => {
    //language=GraphQL
    const query = `
      mutation signin ($input: SigninInput!) {
        signin (input: $input) {
          token,
          user {
            id,
            username,
            createdAt,
            updatedAt
          }
        }
      }`;

    const results = await requestWithPatching(query, {
      input: user,
    });

    expect(results.errors).toBeUndefined();

    expect(results.data.signin.token).toBeDefined();

    const payload = await jwt.decode(results.data.signin.token);

    expect(payload.user).toMatchObject({
      username,
      id: expect.any(Number),
    });
    expect(payload.user).toMatchObject({
      username: results.data.signin.user.username,
      id      : expect.any(Number),
    });

    let createdAt = results.data.signin.user.createdAt;
    let updatedAt = results.data.signin.user.updatedAt;

    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();

    expect(() => new Date(createdAt)).not.toThrow();
    expect(() => new Date(updatedAt)).not.toThrow();
  });
});
