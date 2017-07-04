const path = require('path');
const fs   = require('fs');

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
        waitForConnections: true
      }
    },
  }
};

if (process.env.NODE_ENV === 'production') {
  wetland.stores.defaultStore.ssl = {
    keys: fs.readFileSync(__dirname + '/mysql-ca.pem', 'ascii'),
    cert: fs.readFileSync(__dirname + '/mysql-ca.pem', 'ascii'),
    ca  : fs.readFileSync(__dirname + '/mysql-ca.pem', 'ascii')
  };
}

export default wetland;
