import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface NatGatewayProp extends NetworksProp {
    //TODO:
}

export const NatGateway: Node = {
    ...GraphNode,
    type: 'nat-gateway',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 123, height: 108.05, offset: 0 },
    },
    properties: {
        ...Networks,
    },
};

export const NatGatewayRequiredFields = {};
