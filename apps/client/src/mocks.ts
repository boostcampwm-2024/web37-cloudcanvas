import { Group, Node } from '@types';
import { nanoid } from 'nanoid';

const CloudFunctionNode: Node = {
    id: `node-${nanoid()}`,
    type: 'cloud-function',
    name: 'CloudFunction1',
    point: { x: 270, y: 270 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    connectors: {},
};
const ObjectStorageNode: Node = {
    id: `node-${nanoid()}`,
    type: 'object-storage',
    name: 'ObjectStorage1',
    point: { x: 100, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 100.626, height: 115.695, offset: 20 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    connectors: {},
};
const MySQLDBNode: Node = {
    id: `node-${nanoid()}`,
    type: 'db-mysql',
    name: 'MySQLDB1',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    connectors: {},
};
const ServerNode: Node = {
    id: `node-${nanoid()}`,
    type: 'server',
    name: 'WebServer1',
    point: { x: 90, y: 90 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        os: 'Ubuntu 20.04',
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
        ip: '192.168.0.2',
    },
    connectors: {},
};

const ServerNode2: Node = {
    id: `node-${nanoid()}`,
    type: 'server',
    name: 'WebServer2',
    point: { x: 90, y: 90 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        os: 'Ubuntu 20.04',
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    connectors: {},
};

const SubnetGroup: Group = {
    id: 'subnet1',
    type: 'subnet',
    name: 'Subnet-1',
    nodeIds: [MySQLDBNode.id, ObjectStorageNode.id],
    properties: {
        cidr: '',
    },
    childGroupIds: [],
};

const VpcGroup: Group = {
    id: 'vpc1',
    type: 'vpc',
    name: 'VPC-1',
    nodeIds: [CloudFunctionNode.id, ServerNode.id],
    properties: {
        cidr: '',
    },
    childGroupIds: [],
};

const RegionGroup: Group = {
    id: 'region1',
    type: 'region',
    name: 'KR-1',
    nodeIds: [
        ServerNode2.id,
        MySQLDBNode.id,
        CloudFunctionNode.id,
        ServerNode.id,
        ObjectStorageNode.id,
    ],
    properties: {
        regionCode: 'KR-1',
    },
    childGroupIds: [VpcGroup.id, SubnetGroup.id],
};

const mockNodes = [
    ServerNode2,
    CloudFunctionNode,
    ObjectStorageNode,
    MySQLDBNode,
    MySQLDBNode,
    ServerNode,
];

const mockGroups = [RegionGroup, VpcGroup, SubnetGroup];

export const mockInitialState = {
    nodes: mockNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    groups: mockGroups.reduce(
        (acc, group) => ({ ...acc, [group.id]: group }),
        {},
    ),
    edges: {},
};
