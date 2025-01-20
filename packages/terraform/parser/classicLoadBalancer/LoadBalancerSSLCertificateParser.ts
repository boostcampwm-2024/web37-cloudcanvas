import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudLoadBalancerSSLCertificate } from '../../model/kubernetesService/NCloudLoadBalancerSSLCertificate';

export class LoadBalancerSSLCertificateParser extends BaseResourceParser {
    protected resourceType = ['load_balancer_ssl_certificate'];

    protected createModel(properties: any): NCloudLoadBalancerSSLCertificate {
        return new NCloudLoadBalancerSSLCertificate({
            certificateName: properties.certificate_name,
            privateKey: properties.privatekey,
            publicKeyCertificate: properties.publickey_certificate,
            certificateChain: properties.certificate_chain,
        });
    }
}
