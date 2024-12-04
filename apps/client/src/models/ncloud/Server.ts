import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface ServerProp extends NetworksProp {
    name: string | null;
    server_image_number: string | null;
    server_spec_code: string | null;
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
        name: null,
        server_image_number: null,
        server_spec_code: null,
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
