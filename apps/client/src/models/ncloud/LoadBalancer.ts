import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface LoadBalancerProp extends NetworksProp {
    name?: string;
    networkType?: string;
    subnetNoList?: [];
}

export const LoadBalancerNode: Node & {
    properties: LoadBalancerProp;
} = {
    ...GraphNode,
    type: 'load-balancer',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 97, height: 94, depth: 38, offset: 10 },
    },
    properties: {
        ...Networks,
        name: undefined,
        networkType: undefined,
        subnetNoList: undefined,
    },
};

export const LoadBalancerRequiredFields = {
    name: true,
    networkType: true,
    subnetNoList: true,
};
