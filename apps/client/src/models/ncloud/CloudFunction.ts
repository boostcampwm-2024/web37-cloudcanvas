import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface CloudFunctionProp extends NetworksProp {
    //TODO:
}

export const CloudFunctionNode: Node & {
    properties: CloudFunctionProp;
} = {
    ...GraphNode,
    type: 'cloud-function',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, depth: 58, offset: 12.5 },
    },
    properties: {
        ...Networks,
    },
};
