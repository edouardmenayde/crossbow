import {
    entity,
    increments,
    primary,
    field,
    uniqueConstraint,
    oneToMany,
    manyToMany,
} from 'wetland/dist/src/decorators/Mapping';
import ServiceRepository from '../repository/ServiceRepository';
import {type} from "../../graphql/TypeManager"

@type({description: 'A service.'})
@entity({repository: ServiceRepository})
@uniqueConstraint('tag')
export default class Service {
    @type({description: 'Id of the service.'})
    @increments()
    @primary()
    id = null;

    @type({description: 'Name of the service.'})
    @field({type: 'string'})
    name = null;

    @type({description: 'Unique name of the service, a tag.'})
    @field({type: 'string'})
    tag = null;

    @type()
    @oneToMany({targetEntity: 'ServiceLink', mappedBy: 'service'})
    links = [];

    @type()
    @manyToMany({targetEntity: 'Project', inversedBy: 'services'})
    projects = [];
};
