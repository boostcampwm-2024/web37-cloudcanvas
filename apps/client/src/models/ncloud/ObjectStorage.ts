import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface ObjectStorageProp extends NetworksProp {
    bucketName: string | null;
}

export const ObjectStorage: Node & {
    properties: ObjectStorageProp;
} = {
    ...GraphNode,
    type: 'object-storage',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 100.626, height: 115.695, offset: 20 },
    },
    properties: {
        ...Networks,
        bucketName: null,
    },
};

export const ObjectStorageRequiredFields = {
    bucketName: true,
    vpc: true,
    subnet: true,
    region: true,
};
