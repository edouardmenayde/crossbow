const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const path                              = require('path');
const schema                            = require(path.resolve(process.cwd(), 'graphql'));

module.exports = sails => {
  const graphqlRoutes = {};

  return {
    initialize(cb) {
      sails.on('hook:wetland:loaded', () => {

        graphqlRoutes['/graphql'] = (req, res) => {
          graphqlExpress({schema: schema, context: {req: req}})(req, res);
        };

        graphqlRoutes['/graphiql'] = graphiqlExpress({endpointURL: '/graphql'});

        return cb();
      });
    },

    routes: {
      after: graphqlRoutes
    }

  };
};
