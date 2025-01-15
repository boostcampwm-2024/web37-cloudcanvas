import { BaseResourceParser } from './BaseResourceParser';
import { NCloudMySQLRecovery } from '../model/mysql/NCloudMySQLRecovery';

export class MySQLRecoveryParser extends BaseResourceParser {
    protected resourceType = ['mysql_recovery'];

    protected createModel(properties: any): NCloudMySQLRecovery {
        return new NCloudMySQLRecovery({
            mysqlName: properties.mysql_name,
            recoveryServerName: properties.recovery_server_name,
            subnetName: properties.subnet_name,
            fileName: properties.file_name,
            recoveryTime: properties.recovery_time,
        });
    }
}