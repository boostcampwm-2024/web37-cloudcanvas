import { CloudFunctionNode } from './CloudFunction';
import { LoadBalancer } from './LoadBalancer';
import { MySQLDBNode } from './MySQLDB';
import { RegionGroup, SubnetGroup, VpcGroup } from './Networks';
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
            return LoadBalancer;
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
