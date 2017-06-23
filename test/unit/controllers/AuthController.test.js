"use strict";

const assert = require('chai').assert;

const user = {
  username: 'Test',
  password: '123456789'
};

describe('controllers:AuthController', () => {

  describe('controllers:AuthController:signup', () => {
    it('Should create the user', done => {
      sails.request({
        method: 'POST',
        url   : '/auth/signup',
        data  : user
      }, (error, res) => {
        if (error) {
          return done(error);
        }

        assert.equal(res.statusCode, 201);

        done();
      });
    });
  });

  describe('controllers:AuthController:signin', () => {
    it('Should login the user', done => {
      sails.request({
        method: 'POST',
        url   : '/auth/signin',
        data  : user
      }, (error, res) => {
        if (error) {
          console.log(error)
          return done(error);
        }

        assert.equal(res.statusCode, 200);

        done();
      });
    });
  });

});
