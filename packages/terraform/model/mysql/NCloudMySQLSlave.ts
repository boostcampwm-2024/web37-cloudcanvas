import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { MySQLSlave } from '../../interface/mysql/MySQLSlave';

export class NCloudMySQLSlave implements MySQLSlave, NCloudModel {
    id: string;
    mysqlInstanceNo: string;
    subnetNo?: string;
    mysqlServerList?: {
        serverInstanceNo: string;
        serverName: string;
        serverRole: string;
        zoneCode: string;
        subnetNo: string;
        productCode: string;
        isPublicSubnet: boolean;
        privateDomain: string;
        publicDomain: string;
        memorySize: number;
        cpuCount: number;
        dataStorageSize: number;
        usedDataStorageSize: number;
        uptime: string;
        createDate: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_mysql_slave';
        this.priority = ResourcePriority.MYSQL_SLAVE;

        this.mysqlInstanceNo = `ncloud_mysql.${json.mysqlName.toLowerCase()}.id`;

        this.id = json.id || `mysql-slave-${Date.now()}`;

        if (json.subnetName) {
            this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;
        }

        if (json.mysqlServerList) this.mysqlServerList = json.mysqlServerList;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            mysql_instance_no: this.mysqlInstanceNo,
        };

        if (this.subnetNo) properties.subnet_no = this.subnetNo;

        return properties;
    }
}
