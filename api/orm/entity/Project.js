import {
  entity,
  increments,
  primary,
  field,
  manyToOne,
  manyToMany,
} from 'wetland/dist/src/decorators/Mapping';

@entity()
export default class Project {
  @increments()
  @primary()
  id = null;

  @field({type: 'datetime'})
  createdAt = null;

  @field({type: 'datetime'})
  updatedAt = null;

  @field({type: 'string'})
  name = null;

  @manyToOne({targetEntity: 'Team', mappedBy: 'projects'})
  team = null;

  @manyToMany({targetEntity: 'Service', mappedBy: 'projects'})
  services = [];

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
