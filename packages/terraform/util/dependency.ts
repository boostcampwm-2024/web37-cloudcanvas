import { CloudCanvasNode } from '../interface/CloudCanvasNode';

export const createVpcDependency = (properties: any): CloudCanvasNode => ({
    id: `vpc-${properties.vpc}`,
    type: 'VPC',
    name: properties.vpc,
    properties: {
        cidrBlock: properties.vpcCidr || '172.16.0.0/16',
        region: properties.region,
    },
});

export const createSubnetDependency = (
    properties: any,
    resourceType: string,
): CloudCanvasNode[] => {
    if (Array.isArray(properties.subnet)) {
        return properties.subnet.map((subnetName: any) => ({
            id: `subnet-${subnetName}`,
            type: 'Subnet',
            name: subnetName,
            properties: {
                subnet: properties.subnetCidr || '172.16.10.0/24',
                zone: properties.zone || getZoneByRegion(properties.region),
                subnetType: properties.subnetType || 'PUBLIC',
                usageType:
                    properties.usageType ||
                    getUsageTypeByResourceType(resourceType),
                vpcName: properties.vpc,
                region: properties.region,
            },
        }));
    }
    return [
        {
            id: `subnet-${properties.subnet}`,
            type: 'Subnet',
            name: properties.subnet,
            properties: {
                subnet: properties.subnetCidr || '172.16.10.0/24',
                zone: properties.zone || getZoneByRegion(properties.region),
                subnetType: properties.subnetType || 'PUBLIC',
                usageType:
                    properties.usageType ||
                    getUsageTypeByResourceType(resourceType),
                vpcName: properties.vpc,
                region: properties.region,
            },
        },
    ];
};

export const createAcgDependencies = (
    properties: any,
    nodeName: string,
): CloudCanvasNode[] => [
    {
        id: `acg-${properties.acg}`,
        type: 'ACG',
        name: properties.acg,
        properties: {
            description: `Security group for ${nodeName}`,
            vpcName: properties.vpc,
            region: properties.region,
        },
    },
    {
        id: `acgrule-${properties.acg}`,
        type: 'ACGRule',
        name: `${properties.acg}-rule`,
        properties: {
            acgName: properties.acg,
            protocol: 'TCP',
            ip_block: '0.0.0.0/0',
            port_range: '22',
            description: 'SSH access',
            region: properties.region,
        },
    },
];

export const createNicDependency = (properties: any): CloudCanvasNode => ({
    id: `nic-${properties.nic}`,
    type: 'NetworkInterface',
    name: properties.nic,
    properties: {
        subnetName: properties.subnet,
        acgName: properties.acg,
        region: properties.region,
    },
});

export const createLoginKeyDependency = (properties: any): CloudCanvasNode => ({
    id: `loginkey-${properties.loginKey}`,
    type: 'LoginKey',
    name: properties.loginKey,
    properties: {
        region: properties.region,
    },
});

export const createRedisConfigGroup = (properties: any): CloudCanvasNode => ({
    id: `redisconfig-${properties.configGroup}`,
    type: 'RedisConfigGroup',
    name: properties.configGroup,
    properties: {
        redisVersion: properties.redisVersion,
        region: properties.region,
    },
});

const getZoneByRegion = (region: string): string => {
    switch (region) {
        case 'KR':
            return 'KR-1';
        case 'JPN':
            return 'JPN-4';
        case 'SGN':
            return 'SGN-4';
        default:
            return 'KR-1';
    }
};

const getUsageTypeByResourceType = (
    type: string,
): 'GEN' | 'LOADB' | 'BM' | 'NATGW' => {
    switch (type.toLowerCase()) {
        case 'loadbalancer':
            return 'LOADB';
        case 'natgateway':
            return 'NATGW';
        case 'baremetal':
            return 'BM';
        default:
            return 'GEN';
    }
};
