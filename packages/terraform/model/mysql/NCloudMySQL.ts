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
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_mysql';

        this.priority = ResourcePriority.MYSQL;
        this.id = json.id || `MySQL-${Date.now()}`;
        if (
            !json.serviceName ||
            json.serviceName.length < 3 ||
            json.serviceName.length > 30
        ) {
            throw new Error('MySQL requires service_name (3-30 characters)');
        }
        if (
            !json.serverNamePrefix ||
            json.serverNamePrefix.length < 3 ||
            json.serverNamePrefix.length > 20
        ) {
            throw new Error(
                'MySQL requires server_name_prefix (3-20 characters)',
            );
        }
        if (
            !json.userName ||
            json.userName.length < 4 ||
            json.userName.length > 16
        ) {
            throw new Error('MySQL requires user_name (4-16 characters)');
        }
        if (
            !json.userPassword ||
            json.userPassword.length < 8 ||
            json.userPassword.length > 20
        ) {
            throw new Error('MySQL requires user_password (8-20 characters)');
        }
        if (!json.hostIp) {
            throw new Error('MySQL requires host_ip');
        }
        if (!json.databaseName) {
            throw new Error('MySQL requires database_name (1-30 characters)');
        }

        this.serviceName = json.serviceName.toLowerCase();
        this.serverNamePrefix = json.serverNamePrefix;
        this.userName = json.userName;
        this.userPassword = json.userPassword;
        this.hostIp = json.hostIp;
        this.databaseName = json.databaseName;
        this.subnetNo = `ncloud_subnet.${json.subnet.toLowerCase()}.id`;
    }

    getProperties() {
        return {
            subnet_no: this.subnetNo,
            service_name: this.serviceName,
            server_name_prefix: this.serverNamePrefix,
            user_name: this.userName,
            user_password: this.userPassword,
            host_ip: this.hostIp,
            database_name: this.databaseName,
        };
    }
}
