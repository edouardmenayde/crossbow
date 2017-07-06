import {request, requestWithPatching} from '../../../utils';
import jwt from '../../../../api/utils/jwt';

describe('Graphql::mutations::signin', () => {

  const username = 'Obama';
  const password = '123456789';

  const user = {username, password};

  beforeEach(async () => {
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

    await request(query, {
      input: user
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
                    username
                }
            }
        }`;

    const results = await requestWithPatching(query, {
      input: user
    });

    expect(results.data.signin.token).toBeDefined();

    const payload = await jwt.decode(results.data.signin.token);

    expect(payload.user).toMatchObject({
      username,
      id: expect.any(Number)
    });
    expect(payload.user).toMatchObject({
      username: results.data.signin.user.username,
      id      : expect.any(Number)
    });
  });
});
