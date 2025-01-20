import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { MySQLDatabase } from '../../interface/mysql/MySQLDatabase';

export class NCloudMySQLDatabases implements MySQLDatabase, NCloudModel {
    id: string;
    mysqlInstanceNo: string;
    mysqlDatabaseList: {
        name: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_mysql_databases';
        this.priority = ResourcePriority.MYSQL_DATABASES;

        this.mysqlInstanceNo = `ncloud_mysql.${json.mysqlName.toLowerCase()}.id`;
        this.id = this.mysqlInstanceNo;

        this.mysqlDatabaseList = json.mysqlDatabaseList.map((db: any) => ({
            name: db.name,
        }));
    }

    getProperties() {
        return {
            mysql_instance_no: this.mysqlInstanceNo,
            mysql_database_list: this.mysqlDatabaseList,
        };
    }
}
