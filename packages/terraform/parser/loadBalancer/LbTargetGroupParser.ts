import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudLbTargetGroup } from '../../model/loadBalancer/NCloudLbTargetGroup';

export class LbTargetGroupParser extends BaseResourceParser {
    protected resourceType = ['lb_target_group'];

    protected createModel(properties: any): NCloudLbTargetGroup {
        return new NCloudLbTargetGroup({
            name: this.getNameOrDefault(properties, 'target-group'),
            protocol: properties.protocol,
            vpcName: properties.vpc_name,
            port: properties.port,
            description: properties.description,
            healthCheck: properties.health_check && {
                cycle: properties.health_check.cycle,
                downThreshold: properties.health_check.down_threshold,
                upThreshold: properties.health_check.up_threshold,
                httpMethod: properties.health_check.http_method,
                port: properties.health_check.port,
                protocol: properties.health_check.protocol,
                urlPath: properties.health_check.url_path,
            },
            targetType: properties.target_type,
            useStickySession: properties.use_sticky_session,
            useProxyProtocol: properties.use_proxy_protocol,
            algorithmType: properties.algorithm_type,
        });
    }
}
