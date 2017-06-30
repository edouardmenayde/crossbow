const {GraphQLObjectType, GraphQLID, GraphQLList} = require('graphql');

module.exports = new GraphQLObjectType({
  name       : 'ServiceLink',
  description: 'A service link',
  fields     : () => {
    const User    = require('./User');
    const Service = require('./Service');

    return {
      id     : {
        type       : GraphQLID,
        description: 'ID of the service'
      },
      service: {
        type: Service
      },
      users  : {
        type: new GraphQLList(User)
      }
    }
  }
});
