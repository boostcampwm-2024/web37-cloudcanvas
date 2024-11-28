import { CloudFunctionNode } from './CloudFunction';
import { LoadBalancerNode } from './LoadBalancerNode';
import { MySQLDBNode } from './MySQLDB';
import { RegionGroup, SubnetGroup, VpcGroup } from './Networks';
import { ServerNode } from './Server';
import { ContainerRegistryNode } from './ContainerRegistry';
import { ObjectStorageNode } from './ObjectStorage';

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
