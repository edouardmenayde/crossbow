"use strict";

const assert = require('chai').assert;

const newUser = {
  username: 'modelTest',
  password: 'password'
};

var manager;
var User;

describe('models:User', () => {

  before(() => {
    manager = sails.wetland.getManager();
    User    = manager.getEntity('User');
  });

  it('Should create new user', done => {
    let user      = new User;
    user.username = newUser.username;
    user.password = newUser.password;

    manager.persist(user)
      .flush()
      .then(response => {
        assert.equal(response.cleanObjects[0].username, newUser.username);
        done();
      })
      .catch(done);
  });

  it('Should remove user', done => {
    manager.getRepository(User)
      .findOne({username: newUser.username})
      .then(user => {
        return manager.remove(user).flush().then(response => {
          assert.equal(response.cleanObjects[0].username, newUser.username);
          done();
        });
      })
      .catch(done);
  });
});
