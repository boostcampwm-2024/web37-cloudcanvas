import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface ServerProp extends NetworksProp {
    name?: string;
    server_image_number?: string;
    server_spec_code?: string;
}

export const ServerNode: Node & {
    properties: ServerProp;
} = {
    ...GraphNode,
    type: 'server',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111, offset: 0 },
    },
    properties: {
        ...Networks,
        name: undefined,
        server_image_number: undefined,
        server_spec_code: undefined,
    },
};

export const ServerRequiredFields = {
    name: true,
    server_image_number: true,
    server_spec_code: true,
    vpc: true,
    subnet: true,
    region: true,
};
