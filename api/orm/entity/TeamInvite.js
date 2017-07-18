import {Entity} from 'wetland';

export default class TeamInvite extends Entity {
  constructor() {
    super(...arguments);

    this.expiresIn = 0;
    this.uses      = 0;
  }

  static setMapping(mapping) {
    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Fields
    mapping.forProperty('createdAt').field({
      type: 'datetime',
    });
    mapping.forProperty('updatedAt').field({
      type: 'datetime',
    });
    mapping.forProperty('token').field({type: 'string'});
    mapping.forProperty('expiresIn').field({type: 'integer'});
    mapping.forProperty('uses').field({type: 'integer'});

    // Relations
    mapping.forProperty('requestor').manyToOne({targetEntity: 'User', mappedBy: 'invites'});
    mapping.forProperty('team').manyToOne({targetEntity: 'Team', mappedBy: 'teamInvites'});
  }

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
