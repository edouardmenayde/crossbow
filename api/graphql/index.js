import {graphql} from 'graphql';
import Schema from './schema';
import jwt from '../utils/jwt';
import findToken from '../utils/findToken';
import getWetland from '../utils/getWetland';

const decodeToken = (req, callback) => {
  if (!req) {
    return callback(null);
  }

  const token = findToken(req);

  if (token) {
    return jwt.decode(token)
      .then(token => {
        callback(null, token);
      })
      .catch(error => callback(error));
  }

  callback(null);
};

export default (query, variables, req) => {
  return new Promise(resolve => {
    decodeToken(req, (error, token) => {
      const wetland = getWetland();

      return resolve(graphql(Schema, query, null, {
        auth         : {
          isAuthenticated: !!token,
          scope          : null,
        },
        token,
        wetland,
        getManager   : () => wetland.getManager(),
        getRepository: (Entity) => wetland.getManager().getRepository(Entity),
      }, variables));
    });
  });
};
