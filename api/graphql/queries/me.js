import {GraphQLBoolean} from 'graphql';

export default (typesManager) => {
    return typesManager.generateQuery({
        name         : 'Me',
        payloadFields: () => ({
            user     : {
                type: typesManager.types.get('User'),
            },
            connected: {
                type: GraphQLBoolean,
            },
        }),
        description  : 'Get connected user payload.',
        resolve      : async (_, {}, {token}) => {
            if (!token) {
                return {connected: false};
            }

            return {user: token.user, connected: false};
        },
    });
};
