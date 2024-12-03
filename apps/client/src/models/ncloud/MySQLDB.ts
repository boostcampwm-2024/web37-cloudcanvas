import { GraphNode } from '@helpers/node';
import { Node } from '@types';
import { Networks, NetworksProp } from './Networks';
import validator from 'validator';

export type MYSQLDBProp = {
    serverName?: string;
    serverNamePrefix?: string;
    userName?: string;
    userPassword?: string;
    hostIp?: string;
    databaseName?: string;
    serviceName?: string;
};

export const MySQLDBNode: Node & {
    properties: MYSQLDBProp & NetworksProp;
} = {
    ...GraphNode,
    type: 'db-mysql',
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5, offset: 0 },
    },
    properties: {
        ...Networks,
        serverName: undefined,
        serverNamePrefix: undefined,
        userName: undefined,
        userPassword: undefined,
        hostIp: undefined,
        databaseName: undefined,
        serviceName: undefined,
    },
};

export const MySQLDBRequiredFields = {
    serviceName: true,
    serverName: true,
    serverNamePrefix: true,
    userName: true,
    userPassword: true,
    hostIp: true,
    databaseName: true,
    vpc: true,
    subnet: true,
    region: true,
};

export type ValidationErrors = Partial<Record<keyof MYSQLDBProp, string>>;

export const validateMySQLDB = (
    json: Partial<MYSQLDBProp>,
): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (
        !json.serviceName ||
        !validator.isLength(json.serviceName, { min: 3, max: 30 })
    ) {
        errors.serviceName = 'Service Name 3-30 characters';
    }

    if (
        !json.serverNamePrefix ||
        !validator.isLength(json.serverNamePrefix, { min: 3, max: 20 })
    ) {
        errors.serverNamePrefix = 'Server Name Prefix  3-20 characters';
    }

    if (
        !json.userName ||
        !validator.isLength(json.userName, { min: 4, max: 16 })
    ) {
        errors.userName = 'User Name 4-16 characters';
    }

    if (
        !json.userPassword ||
        !validator.isLength(json.userPassword, { min: 8, max: 20 })
    ) {
        errors.userPassword = 'User Password 8-20 characters';
    }

    if (!json.hostIp || !validator.isIP(json.hostIp, 4)) {
        errors.hostIp = 'Host IP must be a valid IPv4 address';
    }

    if (
        !json.databaseName ||
        !validator.isLength(json.databaseName, { min: 1, max: 30 })
    ) {
        errors.databaseName = 'Database Name 1-30 characters';
    }

    return errors;
};
