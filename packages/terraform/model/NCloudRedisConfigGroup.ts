import { RedisConfigGroup } from '../interface/RedisConfigGroup';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudRedisConfigGroup implements RedisConfigGroup, NCloudModel {
    name: string;
    serviceType: string;
    redisVersion: string;
    description?: string;
    priority: ResourcePriority;
    constructor(json: any) {
        this.serviceType = 'ncloud_redis_config_group';
        this.name = json.name;
        this.priority = ResourcePriority.REDIS_CONFIG_GROUP;
        this.redisVersion = json.redisVersion;
        this.description = json.description;
    }
    getProperties() {
        return {
            name: this.name,
            redis_version: this.redisVersion,
            description: this.description,
        };
    }
}
