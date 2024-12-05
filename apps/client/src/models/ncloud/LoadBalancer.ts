import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface LoadBalancerProp extends NetworksProp {
    name: string | null;
    networkType: string | null;
    subnetNoList: [] | null;
}

export const LoadBalancer: Node & {
    properties: LoadBalancerProp;
} = {
    ...GraphNode,
    type: 'load-balancer',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 97, height: 94, offset: 10 },
    },
    properties: {
        ...Networks,
        name: null,
        networkType: null,
        subnetNoList: null,
    },
};

export const LoadBalancerRequiredFields = {
    name: true,
    networkType: true,
    subnetNoList: true,
};
