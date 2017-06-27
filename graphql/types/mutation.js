const {GraphQLObjectType} = require('graphql');
const signup              = require('./signup');
const signin              = require('./signin');

const MutationType = new GraphQLObjectType({
  name  : 'Mutation',
  fields: {
    signup,
    signin
  }
});

module.exports = MutationType;
