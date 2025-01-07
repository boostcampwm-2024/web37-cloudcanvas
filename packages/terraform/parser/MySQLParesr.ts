import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudModel } from '../interface/NCloudModel';
import { NCloudMySQL } from '../model/mysql/NCloudMySQL';

export class MySQLParesr extends BaseResourceParser {
    protected resourceType = ['db-mysql', 'mysql'];

    protected createModel(properties: any): NCloudModel {
        return new NCloudMySQL({
            serviceName: properties.serviceName || 'mysql',
            serverNamePrefix: properties.serverNamePrefix,
            userName: properties.userName,
            userPassword: properties.userPassword,
            hostIp: properties.hostIp,
            databaseName: properties.databaseName,
            subnet: properties.subnet,
            vpc: properties.vpc,
        });
    }
}
