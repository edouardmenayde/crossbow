import {entity, increments, primary, field, manyToOne} from 'wetland/dist/src/decorators/Mapping';

@entity()
export default class TeamInvite {
  @increments()
  @primary()
  id = null;

  @field({type: 'datetime'})
  createdAt = null;

  @field({type: 'datetime'})
  updatedAt = null;

  @field({type: 'string'})
  token = null;

  @field({type: 'integer'})
  expiresIn = 0;

  @field({type: 'integer'})
  uses = 0;

  @manyToOne({targetEntity: 'User', mappedBy: 'invites'})
  requestor = null;

  @manyToOne({targetEntity: 'Team', mappedBy: 'teamInvites'})
  team = null;

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
