export default class Membership {
  static setMapping(mapping) {
    // Primary Key
    mapping.forProperty('id').increments().primary();

    // Relations
    mapping.forProperty('user').manyToOne({targetEntity: 'User', mappedBy: 'memberships'});
    mapping.forProperty('team').manyToOne({targetEntity: 'Team', mappedBy: 'members'});
  }
};
