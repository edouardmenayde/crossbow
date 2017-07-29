import graphQLHandler from '../../../api/graphql/index';

export const requestWithPatching = (query, variables, req = {headers: {}}) => {
    return request(query, variables, req)
        .then(response => JSON.parse(JSON.stringify(response)));
};

export const request = (query, variables, req = {headers: {}}) => {
    return graphQLHandler(query, variables, req);
};

//language=GraphQL
const signinQuery = `
  mutation signin ($input: SigninInput!) {
    signin (input: $input) {
      token
    }
  }
`;

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

/**
 * Creates a new user and signin this user.
 */
export const getToken = async () => {
    const newUser = {
        username: 'TestUser',
        password: '123456789',
    };

    await request(signupQuery, {
        input: newUser,
    });

    const {data: {signin: {token}}} = await request(signinQuery, {input: newUser});

    return token;
};
