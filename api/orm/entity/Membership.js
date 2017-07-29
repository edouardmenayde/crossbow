import {
  entity,
  increments,
  primary,
  manyToOne,
} from 'wetland/dist/src/decorators/Mapping';
import {type} from "../../graphql/TypeManager"

@type({description: 'A user in a team.'})
@entity()
export default class Membership {
  @type({description: 'Id of the membership.'})
  @increments()
  @primary()
  id = null;

  @type()
  @manyToOne({targetEntity: 'User', mappedBy: 'memberships'})
  user = null;

  @type()
  @manyToOne({targetEntity: 'Team', mappedBy: 'members'})
  team = null;
};
