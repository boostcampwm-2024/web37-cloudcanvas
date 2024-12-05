import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks } from './Networks';

export const User: Node = {
    ...GraphNode,
    type: 'user',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 64, height: 95.068, offset: 0 },
    },
    properties: {
        ...Networks,
    },
};
