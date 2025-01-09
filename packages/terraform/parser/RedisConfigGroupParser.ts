import { BaseResourceParser } from './BaseResourceParser';
import { NCloudRedisConfigGroup } from '../model/redis/NCloudRedisConfigGroup';

export class RedisConfigGroupParser extends BaseResourceParser {
    protected resourceType = ['redisconfiggroup'];

    protected createModel(properties: any): NCloudRedisConfigGroup {
        return new NCloudRedisConfigGroup({
            name: properties.name,
            redis_version: properties.redisVersion,
        });
    }
}
