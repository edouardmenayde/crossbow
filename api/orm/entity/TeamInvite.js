import {entity, increments, primary, field, manyToOne} from 'wetland/dist/src/decorators/Mapping';
import {type} from "../../graphql/TypeManager"

@type('A team invite.')
@entity()
export default class TeamInvite {
    @type('Id of the team invite.')
    @increments()
    @primary()
    id = null;

    @type({description: 'Date a which team invite was created.'})
    @field({type: 'datetime'})
    createdAt = null;

    @type({description: 'Date at which team invite was updated.'})
    @field({type: 'datetime'})
    updatedAt = null;

    @type({description: 'Uniquely generated token and non guessable used to identify the team invite.'})
    @field({type: 'string'})
    token = null;

    @type({description: 'Time in seconds declaring when the team invite will expire.'})
    @field({type: 'integer'})
    expiresIn = 0;

    @type({description: 'Number of uses of the team invite.'})
    @field({type: 'integer'})
    uses = 0;

    @type()
    @manyToOne({targetEntity: 'User', mappedBy: 'invites'})
    requestor = null;

    @type()
    @manyToOne({targetEntity: 'Team', mappedBy: 'teamInvites'})
    team = null;

    beforeCreate() {
        this.createdAt = this.updatedAt = new Date();
    }

    beforeUpdate() {
        this.updatedAt = new Date();
    }
};
