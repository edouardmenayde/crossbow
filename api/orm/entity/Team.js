export default class Team {
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
    mapping.forProperty('name').field({
      type    : 'string',
      nullable: true
    });

    // Relations
    mapping.forProperty('projects').oneToMany({targetEntity: 'Project', inversedBy: 'team'});
    mapping.forProperty('members').oneToMany({targetEntity: 'Membership', inversedBy: 'team'});
    mapping.forProperty('invites').oneToMany({targetEntity: 'TeamInvite', inversedBy: 'team'});
  }

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
