module.exports = class ServiceLink {
  static setMapping(mapping) {
    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Relations
    mapping.forProperty('service').manyToOne({targetEntity: 'Service', inversedBy: 'links'});
    mapping.forProperty('user').manyToOne({targetEntity: 'User', mappedBy: 'serviceLinks'});
  }
};
