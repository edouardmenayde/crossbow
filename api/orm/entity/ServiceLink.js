export default class ServiceLink {
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
    mapping.forProperty('type').field({
      type       : 'enumeration',
      enumeration: ['oauth1', 'oauth2'],
    });
    mapping.forProperty('accessToken').field({
      type: 'string',
    });
    mapping.forProperty('refreshToken').field({
      type: 'string',
    });
    mapping.forProperty('expiresIn').field({
      type: 'integer',
    });

    // Relations
    mapping.forProperty('service')
      .manyToOne({targetEntity: 'Service', inversedBy: 'links'})
      .joinColumn({
        onDelete: 'cascade',
        nullable: false,
      });
    mapping.forProperty('user')
      .manyToOne({targetEntity: 'User', mappedBy: 'serviceLinks'})
      .joinColumn({
        onDelete: 'cascade',
        nullable: false,
      });
  }

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
