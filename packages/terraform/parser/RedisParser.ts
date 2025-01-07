import { BaseResourceParser } from './BaseResourceParser';
import { NCloudRedis } from '../model/redis/NCloudRedis';

export class RedisParser extends BaseResourceParser {
    protected resourceType = ['redis'];

    protected createModel(properties: any): NCloudRedis {
        return new NCloudRedis({
            serviceName: properties.serviceName,
            serverNamePrefix: properties.serverNamePrefix,
            vpcNo: properties.vpc,
            subnetNo: properties.subnet,
            configGroupNo: properties.configGroup,
            mode: properties.mode,
        });
    }
}
