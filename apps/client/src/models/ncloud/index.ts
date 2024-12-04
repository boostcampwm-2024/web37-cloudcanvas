import { ImageBlock } from './ImageBlock';
import { CloudFunctionNode } from './CloudFunction';
import { ContainerRegistryNode } from './ContainerRegistry';
import { LoadBalancerNode } from './LoadBalancer';
import { MySQLDBNode, MySQLDBRequiredFields } from './MySQLDB';
import { NatGatewayNode } from './NatGateway';
import { RegionGroup, SubnetGroup, VpcGroup } from './Networks';
import {
    ObjectStorageNode,
    ObjectStorageRequiredFields,
} from './ObjectStorage';
import { ServerNode, ServerRequiredFields } from './Server';

export const NcloudNodeFactory = (type: string) => {
    switch (type) {
        case 'server':
            return ServerNode;
        case 'cloud-function':
            return CloudFunctionNode;
        case 'db-mysql':
            return MySQLDBNode;
        case 'load-balancer':
            return LoadBalancerNode;
        case 'container-registry':
            return ContainerRegistryNode;
        case 'object-storage':
            return ObjectStorageNode;
        case 'nat-gateway':
            return NatGatewayNode;
        case 'image-block':
            return ImageBlock;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const NcloudGroupFactory = (type: string) => {
    switch (type) {
        case 'region':
            return RegionGroup;
        case 'vpc':
            return VpcGroup;
        case 'subnet':
            return SubnetGroup;

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
