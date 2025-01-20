import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { LoadBalancerSSLCertificate } from '../../interface/classicLoadBalancer/LoadBalancerSSLCertificate';

export class NCloudLoadBalancerSSLCertificate
    implements LoadBalancerSSLCertificate, NCloudModel
{
    id: string;
    certificateName: string;
    privateKey: string;
    publicKeyCertificate: string;
    certificateChain?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_load_balancer_ssl_certificate';
        this.priority = ResourcePriority.LOAD_BALANCER_SSL_CERTIFICATE;

        this.certificateName = json.certificateName;
        this.privateKey = json.privateKey;
        this.publicKeyCertificate = json.publicKeyCertificate;

        this.id = json.id || `ssl-cert-${Date.now()}`;

        if (json.certificateChain)
            this.certificateChain = json.certificateChain;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            certificate_name: this.certificateName,
            privatekey: this.privateKey,
            publickey_certificate: this.publicKeyCertificate,
        };

        if (this.certificateChain) {
            properties.certificate_chain = this.certificateChain;
        }

        return properties;
    }
}
