import { GraphGroup } from '@helpers/group';
import { Group } from '@types';

export type NetworksProp = {
    region: { key: string; value: string } | null;
    subnet: { key: string; value: string } | null;
    vpc: { key: string; value: string } | null;
};

export const Networks: NetworksProp = {
    region: null,
    subnet: null,
    vpc: null,
};

export const NetworksRequiredFields = {
    region: true,
    subnet: true,
    vpc: true,
};

export const Region: Group = {
    ...GraphGroup,
    type: 'region',
    properties: {
        name: '',
    },
};

export const Vpc: Group = {
    ...GraphGroup,
    type: 'vpc',
    properties: {
        name: '',
    },
};

export const Subnet: Group = {
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
