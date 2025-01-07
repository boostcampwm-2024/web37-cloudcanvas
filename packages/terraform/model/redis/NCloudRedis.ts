import { Redis } from '../../interface/Redis';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudRedis implements Redis, NCloudModel {
    serviceType: string;
    serviceName: string;
    serverNamePrefix: string;
    vpcNo: string;
    subnetNo: string;
    configGroupNo: string;
    mode: string;
    priority: ResourcePriority;
    constructor(json: any) {
        this.serviceType = 'ncloud_redis';
        this.serviceName = json.serviceName;
        this.serverNamePrefix = json.serverNamePrefix;
        this.vpcNo = `ncloud_vpc.${json.vpcNo.toLowerCase()}.id`;
        this.subnetNo = `ncloud_subnet.${json.subnetNo.toLowerCase()}.id`;
        this.configGroupNo = `ncloud_redis_config_group.${json.configGroupNo.toLowerCase()}.id`;
        this.mode = json.mode;
        this.priority = ResourcePriority.REDIS;
    }
    getProperties() {
        return {
            service_name: this.serviceName,
            service_name_prefix: this.serverNamePrefix,
            vpc_no: this.vpcNo,
            subnet_no: this.subnetNo,
            config_group_no: this.configGroupNo,
            mode: this.mode,
        };
    }
}
