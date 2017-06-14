"use strict";

/**
 * Test environment settings
 * @description :: This section overrides all other config values ONLY in test environment
 */

const path = require('path');

module.exports = {
  log     : {
    level: 'silent'
  },
  wetland : {
    entityPath   : path.resolve(process.cwd(), 'api', 'entity'),
    dataDirectory: path.resolve(process.cwd(), './test/.data'),
    stores    : {
      testStore: {
        client    : 'mysql',
        connection: {
          host    : '127.0.0.1',
          user    : 'root',
          password: '',
          database: 'crossbowTest'
        }
      }
    },
    defaultStore : 'testStore'
  },
  policies: {
    '*': true
  },
  hooks   : {
    csrf   : false,
    grunt  : false,
    i18n   : false,
    pubsub : false,
    session: false,
    sockets: false,
    views  : false
  }
};
