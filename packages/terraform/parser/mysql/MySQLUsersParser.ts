import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudMySQLUsers } from '../../model/mysql/NCloudMySQLUsers';

export class MySQLUsersParser extends BaseResourceParser {
    protected resourceType = ['mysql_users'];

    protected createModel(properties: any): NCloudMySQLUsers {
        return new NCloudMySQLUsers({
            mysqlName: properties.mysql_name,
            mysqlUserList: properties.mysql_user_list,
        });
    }
}
