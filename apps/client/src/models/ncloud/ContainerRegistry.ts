import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface ContainerRegistryProp extends NetworksProp {
    //TODO:
}

export const ContainerRegistry: Node & {
    properties: ContainerRegistryProp;
} = {
    ...GraphNode,
    type: 'container-registry',
    size: {
        '2d': { width: 360, height: 360 },
        '3d': { width: 512, height: 296, offset: 37 },
    },
    properties: {
        ...Networks,
    },
};

export const ContainerRegistryRequiredFields = {};
