import {request, requestWithPatching} from '../../../utils';

describe.skip('Graphql::mutations::linkservice', () => {

  const username = 'Veil';
  const password = 'Simone';

  const user = {username, password};

  const signin = async () => {
    //language=GraphQL
    const signinQuery = `
      mutation signin ($input: SigninInput!) {
        signin (input: $input) {
          token
        }
      }
    `;

    const {data: {signin: {token}}} = await request(signinQuery, {input: user});

    return token;
  };

  beforeAll(async () => {
    //language=GraphQL
    const signupQuery = `
      mutation signup ($input: SignupInput!) {
        signup (input: $input) {
          user {
            id,
            username
          }
        }
      }`;

    await request(signupQuery, {
      input: user
    });
  });

  test('Should link a service for the first time', async () => {
    const token = await signin();

    //language=GraphQL
    const query = `
      mutation linkService ($input: LinkServiceInput!) {
        linkService(input: $input) {
          serviceLink {
            createdAt,
            updatedAt,
            type,
            accessToken,
            refreshToken,
            expiresIn
          }
        }
      }`;

    const accessToken = 'ILovePastas';

    const results = await requestWithPatching(query, {
      input: {
        service: 1,
        type   : 'oauth1',
        accessToken
      }
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    expect(results.errors).toBeUndefined();

    const serviceLink = results.data.linkService.serviceLink;

    expect(serviceLink.accessToken).toBe(accessToken);
    expect(() => new Date(serviceLink.createdAt)).not.toThrow();
    expect(() => new Date(serviceLink.updatedAt)).not.toThrow();
  });

  /**
   * @TODO::implement
   */
  test('Should re-link an existing service', () => {
  })
});
