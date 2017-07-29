import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';
import GraphQLDate from 'graphql-date';
import {MetaData} from 'wetland';
import {Homefront} from 'homefront';
import {me, services, servicesForUser} from './queries';
import {createProject, createTeamInvite, linkService, signup, signin, unlinkService} from './mutations';

export class Mapping {

    static MAPPING = 'type-mapping';

    mapping = new Homefront;

    static forEntity(target) {
        let entity   = MetaData.getConstructor(target);
        let metadata = MetaData.forTarget(entity);

        if (!metadata.fetch(this.MAPPING)) {
            metadata.put(this.MAPPING, new Mapping(entity));
        }

        return metadata.fetch(this.MAPPING);
    }

    constructor(entity) {
        this.target = entity;
    }

    typeProperty(property, options) {
        Homefront.merge(this.mapping.fetchOrPut(`types.${property}`, {
            description: '',
        }), options);

        return this;
    }

    type(options) {
        Homefront.merge(this.mapping.fetchOrPut('type', {
            description: '',
        }), options);

        return this;
    }

    getMapping() {
        return {
            type : this.mapping.fetch('type'),
            types: this.mapping.fetch('types'),
        };
    }
}

export function type(options) {
    return (target, property) => {
        if (property) {
            Mapping.forEntity(target).typeProperty(property, options);
        }
        else {
            Mapping.forEntity(target).type(options);
        }
    }
}

const getGraphQLType = (usualType) => {
    let type;

    switch (usualType) {
        case 'string':
            type = GraphQLString;
            break;

        case 'integer':
            type = GraphQLInt;
            break;

        case 'boolean':
            type = GraphQLBoolean;
            break;

        case 'datetime':
            type = GraphQLDate;
            break;

        default:
            type = GraphQLInt;
            break;
    }

    return type;
};

const generateTypesForFields = (fields, typesMapping, typeStore) => {
    const types = {};

    Reflect.ownKeys(fields).forEach(fieldName => {
        if (typesMapping[fieldName]) {

            let field = fields[fieldName];

            if (!field.relationship) {
                types[fieldName] = {
                    type       : getGraphQLType(field.type),
                    description: typesMapping[fieldName].description,
                };
            }

            if (field.relationship) {
                if (field.relationship.type === 'oneToMany' || field.relationship.type === 'manyToMany') {
                    types[fieldName] = {
                        type       : new GraphQLList(typeStore.get(field.relationship.targetEntity)),
                        description: typesMapping[fieldName].description,
                    };
                }
                else {
                    types[fieldName] = {
                        type       : typeStore.get(field.relationship.targetEntity),
                        description: typesMapping[fieldName].description,
                    }
                }
            }
        }
    });

    return types;
};

const generateGraphQLType = (entity, typeMapping, typeStore) => {
    const mapping = entity.mapping;
    const fields  = mapping.getFields();

    if (!typeMapping.type) {
        return;
    }

    return new GraphQLObjectType({
        name       : mapping.getEntityName(),
        description: typeMapping.type.description,
        fields     : () => ({
            ...generateTypesForFields(fields, typeMapping.types, typeStore),
        }),
    });
};

export class TypeManager {
    constructor(wetland) {
        this.wetland = wetland;
        this.types   = new Map();
        this.generateTypes();
    }

    generateTypes() {
        const entities = this.wetland.getManager().getEntities();

        Reflect.ownKeys(entities).forEach(entityName => {
            const entity      = entities[entityName];
            const typeMapping = Mapping.forEntity(entity.entity).getMapping();

            if (typeMapping.type) {
                this.types.set(entityName, generateGraphQLType(entity, typeMapping, this.types));
            }
        });
    }

    generateQueryType() {
        return new GraphQLObjectType({
            name  : 'Query',
            fields: {
                servicesForUser: servicesForUser(this),
                services       : services(this),
                me             : me(this),
            },
        });
    }

    generateMutationType() {
        return new GraphQLObjectType({
            name  : 'Mutation',
            fields: {
                signup          : signup(this),
                signin          : signin(this),
                linkService     : linkService(this),
                unlinkService   : unlinkService(this),
                createProject   : createProject(this),
                createTeamInvite: createTeamInvite(this),
            },
        });
    }

    generateSchema() {
        return new GraphQLSchema({
            query   : this.generateQueryType(),
            mutation: this.generateMutationType(),
        });
    }

    generateQuery({name, payloadFields, description, resolve}) {
        const payload = new GraphQLObjectType({
            name  : `${name}Payload`,
            fields: payloadFields,
        });

        return {
            type: new GraphQLNonNull(payload),
            description,
            resolve,
        };
    }
}
