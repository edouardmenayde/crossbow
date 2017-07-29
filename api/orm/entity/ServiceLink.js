import {
    entity,
    increments,
    primary,
    field,
    manyToOne,
    joinColumn,
} from 'wetland/dist/src/decorators/Mapping';
import {type} from "../../graphql/TypeManager"

@type({description: 'Infos used to identify a user to a service which make a Link.'})
@entity()
export default class ServiceLink {
    @type({description: 'Id of the service link.'})
    @increments()
    @primary()
    id = null;

    @type({description: 'Date at which the service was linked.'})
    @field({type: 'datetime'})
    createdAt = null;

    @type({description: 'Date at which link was last updated.'})
    @field({type: 'datetime'})
    updatedAt = null;

    @type({description: 'Type of link.'})
    @field({
        type       : 'enumeration',
        enumeration: ['oauth1', 'oauth2'],
        nullable   : true,
    })
    type = null;

    @type({description: 'Token used to identify the user.'})
    @field({
        type    : 'string',
        nullable: true,
    })
    accessToken = null;

    @type({description: 'Token used to renew the accessToken.'})
    @field({
        type    : 'string',
        nullable: true,
    })
    refreshToken = null;

    @type({description: 'Time in seconds when the link will expire.'})
    @field({
        type: 'integer',
    })
    expiresIn = null;

    @type()
    @manyToOne({targetEntity: 'Service', inversedBy: 'links'})
    @joinColumn({
        onDelete: 'cascade',
        nullable: false,
    })
    service = null;

    @type()
    @manyToOne({targetEntity: 'User', mappedBy: 'serviceLinks'})
    @joinColumn({
        onDelete: 'cascade',
        nullable: false,
    })
    user = null;

    beforeCreate() {
        this.createdAt = this.updatedAt = new Date();
    }

    beforeUpdate() {
        this.updatedAt = new Date();
    }
};
