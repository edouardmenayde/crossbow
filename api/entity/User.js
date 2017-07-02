const {Entity}    = require('wetland');

/**
 * @Todo:: Add createdAt and updatedAt.
 * @type {User}
 */
module.exports = class User extends Entity {
  static setMapping(mapping) {
    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Fields
    mapping.forProperty('username').field({type: 'string'});
    mapping.forProperty('password').field({type: 'string'});

    // Relations
    mapping.forProperty('serviceLinks').oneToMany({targetEntity: 'ServiceLink', inversedBy: 'user'});
  }

  /**
   * Before creating the user, make sure the password gets hashed.
   *
   * @returns {Promise}
   */
  beforeCreate() {
    return HashService.bcrypt.hash(this.password)
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
    if (values.password === '') {
      throw Error('Password cannot be empty.');
    }

    if (!values.password) {
      delete values.password;

      return;
    }

    return HashService.bcrypt.hash(values.password)
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
