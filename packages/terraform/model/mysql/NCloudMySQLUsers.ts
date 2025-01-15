import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { MySQLUsers } from '../../interface/mysql/MySQLUsers';

export class NCloudMySQLUsers implements MySQLUsers, NCloudModel {
    id: string;
    mysqlInstanceNo: string;
    mysqlUserList: {
        name: string;
        password: string;
        hostIp: string;
        authority: 'READ' | 'CRUD' | 'DDL';
        isSystemTableAccess?: boolean;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_mysql_users';
        this.priority = ResourcePriority.MYSQL_USERS;

        this.mysqlInstanceNo = `ncloud_mysql.${json.mysqlName.toLowerCase()}.id`;
        this.id = this.mysqlInstanceNo;

        this.mysqlUserList = json.mysqlUserList.map((user: any) => ({
            name: user.name,
            password: user.password,
            hostIp: user.hostIp,
            authority: user.authority,
            isSystemTableAccess:
                user.isSystemTableAccess !== undefined
                    ? user.isSystemTableAccess
                    : true,
        }));
    }

    getProperties() {
        return {
            mysql_instance_no: this.mysqlInstanceNo,
            mysql_user_list: this.mysqlUserList.map((user) => ({
                name: user.name,
                password: user.password,
                host_ip: user.hostIp,
                authority: user.authority,
                is_system_table_access: user.isSystemTableAccess,
            })),
        };
    }
}
