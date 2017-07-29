import {GraphQLInputObjectType, GraphQLObjectType, GraphQLNonNull, GraphQLInt} from 'graphql';
import withAuth from '../../lib/auth';

export default (typesManager) => {
    const UnlinkServiceInput = new GraphQLInputObjectType({
        name  : 'UnlinkServiceInput',
        fields: {
            serviceLink: {
                type: new GraphQLNonNull(GraphQLInt),
            },
        },
    });

    const UnlinkServicePayload = new GraphQLObjectType({
        name  : 'UnlinkServicePayload',
        fields: {
            serviceLink: {
                type: typesManager.types.get('ServiceLink'),
            },
        },
    });

    return {
        name       : 'LinkService',
        description: 'Create or update a service link',
        type       : new GraphQLNonNull(UnlinkServicePayload),
        args       : {
            input: {
                type: new GraphQLNonNull(UnlinkServiceInput),
            },
        },
        resolve    : withAuth(async (_, {input}, {wetland}) => {
            const manager               = wetland.getManager();
            const ServiceLinkRepository = manager.getRepository('ServiceLink');

            try {
                let serviceLink = await ServiceLinkRepository.findOne(input.serviceLink);

                if (!serviceLink) {
                    return new Error('Record not found with specified id.')
                }

                await manager.remove(serviceLink).flush();

                return {serviceLink};
            }
            catch (error) {
                throw error;
            }
        }),
    };
};
