const path = require('path');

module.exports.wetland = {
  entityPath: path.resolve(process.cwd(), 'api', 'entity'),
  stores    : {
    defaultStore: {
      client    : 'mysql',
      connection: {
        host    : '127.0.0.1',
        user    : 'root',
        password: '',
        database: 'crossbow'
      }
    }
  }
};
