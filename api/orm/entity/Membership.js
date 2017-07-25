import {
  entity,
  increments,
  primary,
  manyToOne,
} from 'wetland/dist/src/decorators/Mapping';

@entity()
export default class Membership {
  @increments()
  @primary()
  id = null;

  @manyToOne({targetEntity: 'User', mappedBy: 'memberships'})
  user = null;

  @manyToOne({targetEntity: 'Team', mappedBy: 'members'})
  team = null;
};
