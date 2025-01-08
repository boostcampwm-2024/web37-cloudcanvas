import { Redis } from '../../interface/redis/Redis';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudRedis implements Redis, NCloudModel {
    serviceType: string;
    serviceName: string;
    serverNamePrefix: string;
    userName?: string;
    userPassword?: string;
    vpcNo: string;
    subnetNo: string;
    configGroupNo: string;
    mode: 'CLUSTER' | 'SIMPLE';
    imageProductCode?: string;
    productCode?: string;
    shardCount?: number;
    shardCopyCount?: number;
    isHa?: boolean;
    isBackup?: boolean;
    backupFileRetentionPeriod?: number;
    isAutomaticBackup?: boolean;
    backupTime?: string;
    port?: number;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_redis';
        this.priority = ResourcePriority.REDIS;

        this.serviceName = json.serviceName;
        this.serverNamePrefix = json.serverNamePrefix;
        this.vpcNo = `ncloud_vpc.${json.vpcNo.toLowerCase()}.id`;
        this.subnetNo = `ncloud_subnet.${json.subnetNo.toLowerCase()}.id`;
        this.configGroupNo = `ncloud_redis_config_group.${json.configGroupNo.toLowerCase()}.id`;
        this.mode = json.mode;

        if (json.userName) this.userName = json.userName;
        if (json.userPassword) this.userPassword = json.userPassword;
        if (json.imageProductCode)
            this.imageProductCode = json.imageProductCode;
        if (json.productCode) this.productCode = json.productCode;
        if (json.shardCount) this.shardCount = json.shardCount;
        if (json.shardCopyCount !== undefined)
            this.shardCopyCount = json.shardCopyCount;
        if (json.isHa !== undefined) this.isHa = json.isHa;
        if (json.isBackup !== undefined) this.isBackup = json.isBackup;
        if (json.backupFileRetentionPeriod)
            this.backupFileRetentionPeriod = json.backupFileRetentionPeriod;
        if (json.isAutomaticBackup !== undefined)
            this.isAutomaticBackup = json.isAutomaticBackup;
        if (json.backupTime) this.backupTime = json.backupTime;
        if (json.port) this.port = json.port;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            service_name: this.serviceName,
            server_name_prefix: this.serverNamePrefix,
            vpc_no: this.vpcNo,
            subnet_no: this.subnetNo,
            config_group_no: this.configGroupNo,
            mode: this.mode,
        };

        if (this.userName) properties.user_name = this.userName;
        if (this.userPassword) properties.user_password = this.userPassword;
        if (this.imageProductCode)
            properties.image_product_code = this.imageProductCode;
        if (this.productCode) properties.product_code = this.productCode;
        if (this.shardCount) properties.shard_count = this.shardCount;
        if (this.shardCopyCount !== undefined)
            properties.shard_copy_count = this.shardCopyCount;
        if (this.isHa !== undefined) properties.is_ha = this.isHa;
        if (this.isBackup !== undefined) properties.is_backup = this.isBackup;
        if (this.backupFileRetentionPeriod)
            properties.backup_file_retention_period =
                this.backupFileRetentionPeriod;
        if (this.isAutomaticBackup !== undefined)
            properties.is_automatic_backup = this.isAutomaticBackup;
        if (this.backupTime) properties.backup_time = this.backupTime;
        if (this.port) properties.port = this.port;

        return properties;
    }
}
