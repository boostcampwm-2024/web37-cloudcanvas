import { BaseResourceParser } from './BaseResourceParser';
import { NCloudModel } from '../interface/NCloudModel';
import { NCloudMySQL } from '../model/mysql/NCloudMySQL';

export class MySQLParesr extends BaseResourceParser {
    protected resourceType = ['db-mysql', 'mysql'];

    protected createModel(properties: any): NCloudModel {
        return new NCloudMySQL({
            serviceName: properties.service_name || 'mysql',
            serverNamePrefix: properties.server_name_prefix,
            userName: properties.user_name,
            userPassword: properties.user_password,
            hostIp: properties.host_ip,
            databaseName: properties.database_name,
            subnet: properties.subnet,
            vpc: properties.vpc,
        });
    }
}
