import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { LoadBalancerListener } from '../../interface/loadBalancer/LbListener';

export class NCloudLbListener implements LoadBalancerListener, NCloudModel {
    id: string;
    loadBalancerNo: string;
    targetGroupNo: string;
    port: number;
    protocol: 'HTTP' | 'HTTPS' | 'TCP' | 'UDP' | 'TLS';
    tlsMinVersionType?: 'TLSV10' | 'TLSV11' | 'TLSV12';
    useHttp2?: boolean;
    sslCertificateNo?: string;
    listenerNo?: string;
    ruleNoList?: string[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_lb_listener';
        this.priority = ResourcePriority.LOAD_BALANCER_LISTENER;

        this.loadBalancerNo = `ncloud_lb.${json.loadBalancerName.toLowerCase()}.load_balancer_no`;
        this.targetGroupNo = `ncloud_lb_target_group.${json.targetGroupName.toLowerCase()}.target_group_no`;
        this.port = json.port;
        this.protocol = json.protocol;

        this.id = json.id || `lb-listener-${Date.now()}`;

        if (json.tlsMinVersionType)
            this.tlsMinVersionType = json.tlsMinVersionType;
        if (json.useHttp2 !== undefined) this.useHttp2 = json.useHttp2;
        if (json.sslCertificateNo)
            this.sslCertificateNo = json.sslCertificateNo;

        if (json.listenerNo) this.listenerNo = json.listenerNo;
        if (json.ruleNoList) this.ruleNoList = json.ruleNoList;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            load_balancer_no: this.loadBalancerNo,
            target_group_no: this.targetGroupNo,
            port: this.port,
            protocol: this.protocol,
        };

        if (this.tlsMinVersionType)
            properties.tls_min_version_type = this.tlsMinVersionType;
        if (this.useHttp2 !== undefined) properties.use_http2 = this.useHttp2;
        if (this.sslCertificateNo)
            properties.ssl_certificate_no = this.sslCertificateNo;

        return properties;
    }
}
