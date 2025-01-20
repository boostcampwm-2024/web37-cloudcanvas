import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudMySQLDatabases } from '../../model/mysql/NCloudMySQLDatabase';
export class MySQLDatabasesParser extends BaseResourceParser {
    protected resourceType = ['mysql_databases'];

    protected createModel(properties: any): NCloudMySQLDatabases {
        return new NCloudMySQLDatabases({
            mysqlName: properties.mysql_name,
            mysqlDatabaseList: properties.mysql_database_list,
        });
    }
}
