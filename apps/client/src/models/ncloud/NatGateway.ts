import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface NatGatewayProp extends NetworksProp {
    //TODO:
}

export const NatGatewayNode: Node = {
    ...GraphNode,
    type: 'nat-gateway',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 123, height: 108.05, depth: 74, offset: 0 },
    },
    properties: {
        ...Networks,
    },
    filterConnectorTypes: {
        '2d': ['top', 'right', 'bottom', 'left'],
        '3d': ['center'],
    },
};

export const NatGatewayRequiredFields = {};
