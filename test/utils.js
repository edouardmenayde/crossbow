import graphQLHandler from '../api/graphql/index';

export const requestWithPatching = (query, variables, req = {headers: {}}) => {
  return request(query, variables, req)
    .then(response => JSON.parse(JSON.stringify(response)));
};

export const request = (query, variables, req = {headers: {}}) => {
  return graphQLHandler(query, variables, req);
};
