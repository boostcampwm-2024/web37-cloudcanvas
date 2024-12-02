import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';

export interface MYSQLDBProp extends NetworksProp {
    //TODO:
}

export const MySQLDBNode: Node = {
    ...GraphNode,
    type: 'db-mysql',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5, offset: 0 },
    },
    properties: {
        ...Networks,
    },
};

export const MySQLDBRequiredFields = {};
