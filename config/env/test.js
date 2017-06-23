"use strict";

/**
 * Test environment settings
 * @description :: This section overrides all other config values ONLY in test environment
 */

const path = require('path');

module.exports = {
  log     : {
    level: 'verbose'
  },
  wetland : {
    entityPath   : path.resolve(process.cwd(), 'api', 'entity'),
    dataDirectory: path.resolve(process.cwd(), './test/.data'),
    stores    : {
      defaultStore: {
        client    : 'mysql',
        connection: {
          host    : '127.0.0.1',
          user    : 'root',
          password: '',
          database: 'crossbow_test'
        }
      }
    }
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
