const ServiceRepository = require('../repository/ServiceRepository');

module.exports = class Service {
  static setMapping(mapping) {
    // Repository
    mapping.entity({repository: ServiceRepository});

    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Fields
    mapping.forProperty('name').field({type: 'string'});
    mapping.forProperty('tag').field({type: 'string'});
    mapping.uniqueConstraint('tag');

    // Relations
    mapping.forProperty('links').oneToMany({targetEntity: 'ServiceLink', mappedBy: 'service'});
  }
};
