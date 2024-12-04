import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export const ImageBlock: Node = {
    ...GraphNode,
    type: 'image-block',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111, offset: 0 },
    },
    properties: {
        ...Networks,
    },
};
