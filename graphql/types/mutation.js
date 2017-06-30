const {GraphQLObjectType} = require('graphql');
const signup              = require('./signup');
const signin              = require('./signin');

module.exports = new GraphQLObjectType({
  name  : 'Mutation',
  fields: {
    signup,
    signin
  }
});

