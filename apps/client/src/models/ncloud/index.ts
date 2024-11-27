import { Group, Node } from '@types';

export const NcloudNodeFactory = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        case 'cloud-function':
            return CloudFunction;
        case 'db-mysql':
            return MySQLDB;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const NcloudGroupFactory = (type: string) => {
    switch (type) {
        case 'region':
            return Region;
        case 'vpc':
            return Vpc;
        case 'subnet':
            return Subnet;

        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

const GraphNodeProperties = {
    id: '',
    type: '',
    point: { x: 0, y: 0 },
    connectors: {},
};

const GraphGroupProperties = {
    id: '',
    type: '',
    nodeIds: [],
    properties: {},
    childGroupIds: [],
    parentGroupId: '',
};

const Server: Node = {
    ...GraphNodeProperties,
    type: 'server',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        name: undefined,
        region: undefined,
        subnet: undefined,
        vpc: undefined,
        server_image_number: undefined,
        server_spec_code: undefined,
    },
};

const CloudFunction: Node = {
    ...GraphNodeProperties,
    type: 'cloud-function',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        region: '',
        vpc: '',
        subnet: '',
    },
};

const MySQLDB: Node = {
    ...GraphNodeProperties,
    type: 'db-mysql',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        region: '',
        vpc: '',
        subnet: '',
    },
};

const Region: Group = {
    ...GraphGroupProperties,
    type: 'region',
    properties: {
        name: undefined,
    },
};

const Vpc: Group = {
    ...GraphGroupProperties,
    type: 'vpc',
};

const Subnet: Group = {
    ...GraphGroupProperties,
    type: 'subnet',
};
