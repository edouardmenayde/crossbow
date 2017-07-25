import {requestWithPatching, getToken} from '../utils';

describe('Graphql::queries::me', () => {

  test('Should return the authenticated user', async () => {
    const token = await getToken();

    //language=GraphQL
    const query = `
     query me {
       me {
         user {
           id
         }
       }
      }`;

    const results = await requestWithPatching(query, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(results.errors).toBeUndefined();

    expect(results.data.me.user).toMatchObject({
      id: expect.any(Number),
    });

  });

  test('Should return null', async () => {
    //language=GraphQL
    const query = `
     query me {
       me {
         user {
           id
         }
       }
      }`;

    const results = await requestWithPatching(query, null);

    expect(results.errors).toBeUndefined();

    expect(results.data.me.user).toBeNull();
  });
});
