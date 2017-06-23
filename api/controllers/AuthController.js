"use strict";

/**
 * AuthController
 * @description :: Server-side logic for manage users' authorization
 */

const _              = require('lodash');
const passport       = require('passport');
const requestHelpers = require('request-helpers');

const userBlueprint = [
  {param: 'username', cast: 'string', required: true},
  {param: 'password', cast: 'string', required: true}
];

module.exports = {
  /**
   * Sign in by email\password
   * @param req
   * @param res
   */
  signin(req, res) {
    let values = requestHelpers.secureParameters(userBlueprint, req);

    if (!values.isValid()) {
      return res.badRequest();
    }

    values = values.asObject();

    const manager        = req.getManager();
    const User           = manager.getEntity('User');
    const UserRepository = manager.getRepository(User);

    UserRepository
      .findOne({
        username: values.username
      })
      .then(user => {
        return Promise.all([
          user,
          HashService.bcrypt.compare(values.password, user.password)
        ]);
      })
      .then(response => {
        let [user] = response;

        return passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, res, user))(req, res);
      })
      .catch(res.negotiate);
  },

  /**
   * Sign up by email\password
   * @param req
   * @param res
   */
  signup(req, res) {
    let values = requestHelpers.secureParameters(userBlueprint, req);

    if (!values.isValid()) {
      return res.badRequest();
    }

    values = values.asObject();

    const manager   = req.getManager();
    const User      = manager.getEntity('User');
    const populator = req.wetland.getPopulator(manager);
    const populated = populator.assign(User, values);

    manager
      .persist(populated)
      .flush()
      .then(response => {
        let user = response.cleanObjects[0];

        return {
          token: CipherService.jwt.encodeSync({id: user.id}),
          user : user
        };
      })
      .then(res.created)
      .catch((error) => {
        console.log(error);
        res.negotiate(error);
      });
  },

  /**
   * Authorization via social networks
   * @param req
   * @param res
   */
  social(req, res) {
    const type         = req.param('type') ? req.param('type').toLowerCase() : '-';
    const strategyName = [type, 'token'].join('-');

    if (Object.keys(passport._strategies).indexOf(strategyName) === -1) {
      return res.badRequest(null, {message: [type, ' is not supported'].join('')});
    }

    passport.authenticate('jwt', (error, user, info) => {
      req.user = user;
      passport.authenticate(strategyName, _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
    })(req, res);
  },

  /**
   * Accept JSON Web Token and updates with new one
   * @param req
   * @param res
   */
  refresh_token(req, res) {
    if (!req.param('token')) {
      return res.badRequest(null, {
        message: 'You must provide token parameter'
      });
    }

    const oldDecoded = CipherService.jwt.decodeSync(req.param('token'));

    res.ok({
      token: CipherService.jwt.encodeSync({
        id: oldDecoded.id
      })
    });
  }
};
