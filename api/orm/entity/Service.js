import {
  entity,
  increments,
  primary,
  field,
  uniqueConstraint,
  oneToMany,
  manyToMany,
} from 'wetland/dist/src/decorators/Mapping';
import ServiceRepository from '../repository/ServiceRepository';

@entity({repository: ServiceRepository})
@uniqueConstraint('tag')
export default class Service {
  @increments()
  @primary()
  id = null;

  @field({type: 'string'})
  name = null;

  @field({type: 'string'})
  tag = null;

  @oneToMany({targetEntity: 'ServiceLink', mappedBy: 'service'})
  links = [];

  @manyToMany({targetEntity: 'Project', inversedBy: 'services'})
  projects = [];
};
