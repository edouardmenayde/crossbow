export default class Project {
  static setMapping(mapping) {
    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Fields
    mapping.forProperty('createdAt').field({
      type: 'datetime'
    });
    mapping.forProperty('updatedAt').field({
      type: 'datetime'
    });
    mapping.forProperty('name').field({type: 'string'});

    // Relations
    mapping.forProperty('team').manyToOne({targetEntity: 'Team', mappedBy: 'projects'});
    mapping.forProperty('services').manyToMany({targetEntity: 'Service', mappedBy: 'projects'});
  }

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
