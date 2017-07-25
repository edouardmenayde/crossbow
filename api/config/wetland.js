const path = require('path');
const fs   = require('fs');
const ENV  = process.env.NODE_ENV;

const wetland = {
  entityPath: path.resolve(process.cwd(), 'api', 'orm', 'entity'),
  stores    : {
    defaultStore: {
      client    : 'mysql',
      connection: {
        host              : process.env.MYSQL_HOST || 'localhost',
        user              : process.env.MYSQL_USER || 'root',
        password          : process.env.MYSQL_PASSWORD || '',
        database          : process.env.MYSQL_DATABASE || 'crossbow',
        connectionLimit   : process.env.DB_CONNECTIONS || 5,
        pool              : true,
        waitForConnections: true,
        charset           : 'utf8',
      },
    },
  },
};

if (ENV === 'production') {
  wetland.stores.defaultStore.ssl = {
    keys: fs.readFileSync(__dirname + '/mysql-ca.pem', 'ascii'),
    cert: fs.readFileSync(__dirname + '/mysql-ca.pem', 'ascii'),
    ca  : fs.readFileSync(__dirname + '/mysql-ca.pem', 'ascii'),
  };
}

if (ENV === 'test') {
  wetland.stores.defaultStore.connection.database = 'crossbow_test';
  wetland.dataDirectory                           = path.resolve(process.cwd(), 'test', '.data');
}

module.exports = wetland;
