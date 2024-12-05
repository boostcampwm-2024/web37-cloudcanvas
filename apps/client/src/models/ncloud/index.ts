import { CloudFunction } from './CloudFunction';
import { ContainerRegistry } from './ContainerRegistry';
import { ImageBlock } from './ImageBlock';
import { LoadBalancer } from './LoadBalancer';
import { MySQLDB, MySQLDBRequiredFields } from './MySQLDB';
import { NatGateway } from './NatGateway';
import { Region, Subnet, Vpc } from './Networks';
import { ObjectStorage, ObjectStorageRequiredFields } from './ObjectStorage';
import { RedisDB } from './RedisDB';
import { Server, ServerRequiredFields } from './Server';
import { User } from './User';

export const NcloudNodeFactory = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        case 'cloud-function':
            return CloudFunction;
        case 'db-mysql':
            return MySQLDB;
        case 'db-redis':
            return RedisDB;
        case 'load-balancer':
            return LoadBalancer;
        case 'container-registry':
            return ContainerRegistry;
        case 'object-storage':
            return ObjectStorage;
        case 'nat-gateway':
            return NatGateway;
        case 'image-block':
            return ImageBlock;
        case 'user':
            return User;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const NcloudGroupFactory = (type: string) => {
    switch (type) {
        case 'region':
            return Region;
        case 'vpc':
            return Vpc;
        case 'subnet':
            return Subnet;

        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const getPropertyFilters = (type: string) => {
    switch (type) {
        case 'server':
            return ServerRequiredFields;
        case 'object-storage':
            return ObjectStorageRequiredFields;
        case 'db-mysql':
            return MySQLDBRequiredFields;
        default:
            return {};
    }
};
