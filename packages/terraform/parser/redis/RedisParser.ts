import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudRedis } from '../../model/redis/NCloudRedis';

export class RedisParser extends BaseResourceParser {
    protected resourceType = ['redis'];

    protected createModel(properties: any): NCloudRedis {
        return new NCloudRedis({
            serviceName: properties.service_name,
            serverNamePrefix: properties.server_name_prefix,
            vpcNo: properties.vpc,
            subnetNo: properties.subnet,
            configGroupNo: properties.config_group,
            mode: properties.mode,
        });
    }
}
