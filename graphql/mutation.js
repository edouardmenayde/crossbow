const {GraphQLObjectType} = require('graphql');
const signup              = require('./mutations/signup');
const signin              = require('./mutations/signin');
const linkService         = require('./mutations/linkService');

module.exports = new GraphQLObjectType({
  name  : 'Mutation',
  fields: {
    signup,
    signin,
    linkService
  }
});

