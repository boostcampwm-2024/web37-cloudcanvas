import { CloudFunctionNode } from './CloudFunction';
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
