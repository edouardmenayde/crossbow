import ServiceRepository from '../repository/ServiceRepository';

export default class Service {
  static setMapping(mapping) {
    // Repository
    mapping.entity({repository: ServiceRepository});

    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Fields
    mapping.forProperty('name').field({type: 'string'});
    mapping.forProperty('tag').field({type: 'string'});

    // Constraints
    mapping.uniqueConstraint('tag');

    // Relations
    mapping.forProperty('links').oneToMany({targetEntity: 'ServiceLink', mappedBy: 'service'});
    mapping.forProperty('projects').manyToMany({targetEntity: 'Project', inversedBy: 'services'});

  }
};
