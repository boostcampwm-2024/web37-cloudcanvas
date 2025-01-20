import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudLbListener } from '../../model/loadBalancer/NCloudLbListener';

interface NCloudLoadBalancerListener {}

export class LbListenerParser extends BaseResourceParser {
    protected resourceType = ['lb_listener'];

    protected createModel(properties: any): NCloudLbListener {
        return new NCloudLbListener({
            loadBalancerName: properties.load_balancer_name,
            targetGroupName: properties.target_group_name,
            port: properties.port,
            protocol: properties.protocol,
            tlsMinVersionType: properties.tls_min_version_type,
            useHttp2: properties.use_http2,
            sslCertificateNo: properties.ssl_certificate_no,
        });
    }
}
