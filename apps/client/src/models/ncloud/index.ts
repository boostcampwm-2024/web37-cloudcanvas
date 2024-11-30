import { CloudFunctionNode } from './CloudFunction';
import { ContainerRegistryNode } from './ContainerRegistry';
import { LoadBalancerNode } from './LoadBalancer';
import { MySQLDBNode } from './MySQLDB';
import { NatGatewayNode } from './NatGateway';
import { RegionGroup, SubnetGroup, VpcGroup } from './Networks';
import { ObjectStorageNode } from './ObjectStorage';
import { ServerNode } from './Server';

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
