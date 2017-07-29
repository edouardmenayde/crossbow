import {entity, increments, primary, field, oneToMany} from 'wetland/dist/src/decorators/Mapping';
import {type} from "../../graphql/TypeManager"

@type({description: 'A team.'})
@entity()
export default class Team {
    @type({description: 'Id of the team.'})
    @increments()
    @primary()
    id = null;

    @type({description: 'Date at which the team was created.'})
    @field({type: 'datetime'})
    createdAt = null;

    @type({description: 'Date at which the team was last updated.'})
    @field({type: 'datetime'})
    updatedAt = null;

    @type({description: 'Name of the team.'})
    @field({
        type    : 'string',
        nullable: true,
    })
    name = null;

    @type()
    @oneToMany({targetEntity: 'Project', inversedBy: 'team'})
    projects = [];

    @type()
    @oneToMany({targetEntity: 'Membership', inversedBy: 'team'})
    members = [];

    @type()
    @oneToMany({targetEntity: 'TeamInvite', inversedBy: 'team'})
    invites = [];

    beforeCreate() {
        this.createdAt = this.updatedAt = new Date();
    }

    beforeUpdate() {
        this.updatedAt = new Date();
    }
};
