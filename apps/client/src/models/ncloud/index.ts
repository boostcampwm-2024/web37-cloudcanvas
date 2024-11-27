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
    name: '',
    type: '',
    point: { x: 0, y: 0 },
    connectors: {},
};

const GraphGroupProperties = {
    id: '',
    name: '',
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
        name: '',
        region: '',
        subnet: '',
        vpc: '',
        acg: '',
        server_image: '',
        server_product_code: '',
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
};

const Vpc: Group = {
    ...GraphGroupProperties,
    type: 'vpc',
};

const Subnet: Group = {
    ...GraphGroupProperties,
    type: 'subnet',
};

export const Regions: { [key: string]: string } = {
    kr: 'korea',
    jp: 'japan',
    sg: 'singapore',
};
