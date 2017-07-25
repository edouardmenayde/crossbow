import {
  entity,
  increments,
  primary,
  field,
  manyToOne,
  joinColumn,
} from 'wetland/dist/src/decorators/Mapping';

@entity()
export default class ServiceLink {
  @increments()
  @primary()
  id = null;

  @field({type: 'datetime'})
  createdAt = null;

  @field({type: 'datetime'})
  updatedAt = null;

  @field({
    type       : 'enumeration',
    enumeration: ['oauth1', 'oauth2'],
    nullable   : true,
  })
  type = null;

  @field({
    type    : 'string',
    nullable: true,
  })
  accessToken = null;

  @field({
    type    : 'string',
    nullable: true,
  })
  refreshToken = null;

  @field({
    type: 'integer',
  })
  expiresIn = null;

  @manyToOne({targetEntity: 'Service', inversedBy: 'links'})
  @joinColumn({
    onDelete: 'cascade',
    nullable: false,
  })
  service = null;

  @manyToOne({targetEntity: 'User', mappedBy: 'serviceLinks'})
  @joinColumn({
    onDelete: 'cascade',
    nullable: false,
  })
  user = null;

  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();
  }

  beforeUpdate() {
    this.updatedAt = new Date();
  }
};
