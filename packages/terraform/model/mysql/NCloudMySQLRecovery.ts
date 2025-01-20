import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { MySQLRecovery } from '../../interface/mysql/MySQLRecovery';

export class NCloudMySQLRecovery implements MySQLRecovery, NCloudModel {
    id: string;
    mysqlInstanceNo: string;
    recoveryServerName: string;
    subnetNo?: string;
    fileName?: string;
    recoveryTime?: string;
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
        this.serviceType = 'ncloud_mysql_recovery';
        this.priority = ResourcePriority.MYSQL_RECOVERY;

        this.mysqlInstanceNo = `ncloud_mysql.${json.mysqlName.toLowerCase()}.id`;
        this.recoveryServerName = json.recoveryServerName;

        this.id = json.id || `mysql-recovery-${Date.now()}`;

        if (json.subnetNo) {
            this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;
        }
        if (json.fileName) this.fileName = json.fileName;
        if (json.recoveryTime) this.recoveryTime = json.recoveryTime;

        if (json.mysqlServerList) this.mysqlServerList = json.mysqlServerList;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            mysql_instance_no: this.mysqlInstanceNo,
            recovery_server_name: this.recoveryServerName,
        };

        if (this.subnetNo) properties.subnet_no = this.subnetNo;
        if (this.fileName) properties.file_name = this.fileName;
        if (this.recoveryTime) properties.recovery_time = this.recoveryTime;

        return properties;
    }
}
