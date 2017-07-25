import bcrypt from '../../utils/bcrypt';
import {Entity} from 'wetland';
import {entity, increments, primary, field, oneToMany} from 'wetland/dist/src/decorators/Mapping';

@entity()
export default class User extends Entity {
  @increments()
  @primary()
  id = null;

  @field({type: 'datetime'})
  createdAt = null;

  @field({type: 'datetime'})
  updatedAt = null;

  @field({type: 'string'})
  username = null;

  @field({type: 'string'})
  password = null;

  @oneToMany({targetEntity: 'ServiceLink', inversedBy: 'user'})
  serviceLinks = [];

  @oneToMany({targetEntity: 'Membership', inversedBy: 'user'})
  memberships = [];

  @oneToMany({targetEntity: 'TeamInvite', inversedBy: 'team'})
  teamInvites = [];


  /**
   * Before creating the user, make sure the password gets hashed.
   *
   * @returns {Promise}
   */
  beforeCreate() {
    this.createdAt = this.updatedAt = new Date();

    return bcrypt.hash(this.password)
      .then(hash => {
        this.password = hash;
      });
  }

  /**
   * Before updating the user, make sure the password gets hashed.
   *
   * @param {{}} values
   *
   * @returns {*}
   */
  beforeUpdate(values) {
    this.updatedAt = new Date();

    if (values.password === '') {
      throw Error('Password cannot be empty.');
    }

    if (!values.password) {
      delete values.password;

      return;
    }

    return bcrypt.hash(values.password)
      .then(hash => {
        values.password = hash;
      });
  }

  /**
   * We don't want to expose the password to the world (even if it's hashed).
   *
   * @returns {{}}
   */
  toJSON() {
    // `.toObject()` is a method on `Entity`.
    // This gives us a POJO of our entity's data (minus relations).
    let values = this.toObject();

    delete values.password;

    return values;
  }
};
