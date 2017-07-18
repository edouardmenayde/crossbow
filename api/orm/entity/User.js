import bcrypt from '../../utils/bcrypt';
import {Entity} from 'wetland';

/**
 * @Todo:: Add createdAt and updatedAt.
 * @type {User}
 */
export default class User extends Entity {
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
    mapping.forProperty('username').field({type: 'string'});
    mapping.forProperty('password').field({type: 'string'});

    // Relations
    mapping.forProperty('serviceLinks').oneToMany({targetEntity: 'ServiceLink', inversedBy: 'user'});
    mapping.forProperty('memberships').oneToMany({targetEntity: 'Membership', inversedBy: 'user'});
    mapping.forProperty('teamInvites').oneToMany({targetEntity: 'TeamInvite', inversedBy: 'team'});
  }

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
