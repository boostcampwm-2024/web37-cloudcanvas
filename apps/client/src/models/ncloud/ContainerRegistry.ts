import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface ContainerRegistryProp extends NetworksProp {
    //TODO:
}

export const ContainerRegistryNode: Node & {
    properties: ContainerRegistryProp;
} = {
    ...GraphNode,
    type: 'container-registry',
    size: {
        '2d': { width: 360, height: 360 },
        '3d': { width: 512, height: 333, offset: 0 },
    },
    properties: {
        ...Networks,
    },
};

export const ContainerRegistryRequiredFields = {};
