import {entity, increments, primary, field, oneToMany} from 'wetland/dist/src/decorators/Mapping';

@entity()
export default class Team {
  @increments()
  @primary()
  id = null;

  @field({type: 'datetime'})
  createdAt = null;

  @field({type: 'datetime'})
  updatedAt = null;

  @field({
    type    : 'string',
    nullable: true,
  })
  name = null;

  @oneToMany({targetEntity: 'Project', inversedBy: 'team'})
  projects = [];

  @oneToMany({targetEntity: 'Membership', inversedBy: 'team'})
  members = [];

  @oneToMany({targetEntity: 'TeamInvite', inversedBy: 'team'})
  invites = [];

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
