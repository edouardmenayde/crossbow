import {
  entity,
  increments,
  primary,
  field,
  manyToOne,
  manyToMany,
} from 'wetland/dist/src/decorators/Mapping';
import {type} from "../../graphql/TypeManager"

@type({description: 'A project.'})
@entity()
export default class Project {
  @type({description: 'Id of the project.'})
  @increments()
  @primary()
  id = null;

  @type({description: 'Date at which project was created.'})
  @field({type: 'datetime'})
  createdAt = null;

  @type({description: 'Date at which project was last updated.'})
  @field({type: 'datetime'})
  updatedAt = null;

  @type({description: 'Name of the project.'})
  @field({type: 'string'})
  name = null;

  @type()
  @manyToOne({targetEntity: 'Team', mappedBy: 'projects'})
  team = null;

  @type()
  @manyToMany({targetEntity: 'Service', mappedBy: 'projects'})
  services = [];

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
