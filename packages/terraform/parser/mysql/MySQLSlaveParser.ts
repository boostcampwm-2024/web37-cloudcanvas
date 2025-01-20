import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudMySQLSlave } from '../../model/mysql/NCloudMySQLSlave';

export class MySQLSlaveParser extends BaseResourceParser {
    protected resourceType = ['mysql_slave'];

    protected createModel(properties: any): NCloudMySQLSlave {
        return new NCloudMySQLSlave({
            mysqlName: properties.mysql_name,
            subnetName: properties.subnet_name,
        });
    }
}
