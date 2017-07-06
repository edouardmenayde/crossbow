import {graphql} from 'graphql';
import Schema from './schema';
import jwt from '../utils/jwt';
import findToken from '../utils/findToken';
import getWetland from '../utils/getWetland';

const patchRequest = (req, callback) => {
  if (!req) {
    return callback();
  }

  const token = findToken(req);

  if (token) {
    return jwt.decode(token)
      .then(token => {
        req.token = token;

        callback();
      })
      .catch(error => callback(error));
  }

  callback();
};

export default (query, variables, req) => {
  return new Promise(resolve => {
    patchRequest(req, error => {
      if (error) {
        req.token = null;
      }

      const wetland = getWetland();

      req.getManager = () => wetland.getManager();

      req.getRepository = (Entity) => wetland.getManager().getRepository(Entity);

      req.wetland = wetland;

      return resolve(graphql(Schema, query, null, {
        auth : {
          isAuthenticated: !!req.token,
          scope          : null
        },
        token: req.token,
        req
      }, variables));
    });
  });
};
