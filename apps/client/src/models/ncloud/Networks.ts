import { GraphGroup } from '@helpers/group';
import { Group } from '@types';

export type NetworksProp = {
    region?: { key: string; value: string };
    subnet?: { key: string; value: string };
    vpc?: { key: string; value: string };
};

export const Networks: NetworksProp = {
    region: undefined,
    subnet: undefined,
    vpc: undefined,
};

export const NetworksRequiredFields = {
    region: true,
    subnet: true,
    vpc: true,
};

export const RegionGroup: Group = {
    ...GraphGroup,
    type: 'region',
    properties: {
        name: '',
    },
};

export const VpcGroup: Group = {
    ...GraphGroup,
    type: 'vpc',
    properties: {
        name: '',
    },
};

export const SubnetGroup: Group = {
    ...GraphGroup,
    type: 'subnet',
    properties: {
        name: '',
    },
};

export const NETWORKS_CATEGORIES = [
    'region',
    'vpc',
    'subnet',
    // 'security-group',
];
