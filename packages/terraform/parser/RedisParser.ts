import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudRedis } from '../model/NCloudRedis';

export class RedisParser extends BaseResourceParser {
    protected resourceType = ['redis'];

    protected validateProperties(properties: any): void {
        if (!properties.serviceName) {
            throw new ValidationError('Redis', 'serviceName', 'service name이 필수입니다');
        }
        if (!properties.serverNamePrefix) {
            throw new ValidationError('Redis', 'serverNamePrefix', 'server name prefix가 필수입니다');
        }
        if (!properties.mode || !['CLUSTER', 'STANDALONE'].includes(properties.mode)) {
            throw new ValidationError('Redis', 'mode', 'CLUSTER 또는 STANDALONE 이어야 합니다');
        }
    }

    protected createModel(properties: any): NCloudRedis {
        return new NCloudRedis({
            serviceName: properties.serviceName,
            serverNamePrefix: properties.serverNamePrefix,
            vpcNo: properties.vpc,
            subnetNo: properties.subnet,
            configGroupNo: properties.configGroup,
            mode: properties.mode
        });
    }
}