import { MySQL } from '../../interface/MySQL';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudMySQL implements MySQL, NCloudModel {
    id: string;
    serviceName: string;
    serverNamePrefix: string;
    userName: string;
    userPassword: string;
    hostIp: string;
    databaseName: string;
    subnetNo: string;
    imageProductCode?: string;
    productCode?: string;
    dataStorageType?: 'SSD' | 'HDD' | 'CB1';
    isHa?: boolean;
    isMultiZone?: boolean;
    isStorageEncryption?: boolean;
    isBackup?: boolean;
    backupFileRetentionPeriod?: number;
    backupTime?: string;
    isAutomaticBackup?: boolean;
    port?: number;
    standbyMasterSubnetNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_mysql';
        this.priority = ResourcePriority.MYSQL;

        this.id = json.id || `MySQL-${Date.now()}`;
        this.serviceName = json.serviceName.toLowerCase();
        this.serverNamePrefix = json.serverNamePrefix;
        this.userName = json.userName;
        this.userPassword = json.userPassword;
        this.hostIp = json.hostIp;
        this.databaseName = json.databaseName;
        this.subnetNo = `ncloud_subnet.${json.subnet.toLowerCase()}.id`;

        if (json.imageProductCode) this.imageProductCode = json.imageProductCode;
        if (json.productCode) this.productCode = json.productCode;
        if (json.dataStorageType) this.dataStorageType = json.dataStorageType;
        if (json.isHa !== undefined) this.isHa = json.isHa;
        if (json.isMultiZone !== undefined) this.isMultiZone = json.isMultiZone;
        if (json.isStorageEncryption !== undefined) this.isStorageEncryption = json.isStorageEncryption;
        if (json.isBackup !== undefined) this.isBackup = json.isBackup;
        if (json.backupFileRetentionPeriod) this.backupFileRetentionPeriod = json.backupFileRetentionPeriod;
        if (json.backupTime) this.backupTime = json.backupTime;
        if (json.isAutomaticBackup !== undefined) this.isAutomaticBackup = json.isAutomaticBackup;
        if (json.port) this.port = json.port;
        if (json.standbyMasterSubnetNo) this.standbyMasterSubnetNo = json.standbyMasterSubnetNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            service_name: this.serviceName,
            server_name_prefix: this.serverNamePrefix,
            user_name: this.userName,
            user_password: this.userPassword,
            host_ip: this.hostIp,
            database_name: this.databaseName,
            subnet_no: this.subnetNo,
        };

        if (this.imageProductCode) properties.image_product_code = this.imageProductCode;
        if (this.productCode) properties.product_code = this.productCode;
        if (this.dataStorageType) properties.data_storage_type = this.dataStorageType;
        if (this.isHa !== undefined) properties.is_ha = this.isHa;
        if (this.isMultiZone !== undefined) properties.is_multi_zone = this.isMultiZone;
        if (this.isStorageEncryption !== undefined) properties.is_storage_encryption = this.isStorageEncryption;
        if (this.isBackup !== undefined) properties.is_backup = this.isBackup;
        if (this.backupFileRetentionPeriod) properties.backup_file_retention_period = this.backupFileRetentionPeriod;
        if (this.backupTime) properties.backup_time = this.backupTime;
        if (this.isAutomaticBackup !== undefined) properties.is_automatic_backup = this.isAutomaticBackup;
        if (this.port) properties.port = this.port;
        if (this.standbyMasterSubnetNo) properties.standby_master_subnet_no = this.standbyMasterSubnetNo;

        return properties;
    }

}
