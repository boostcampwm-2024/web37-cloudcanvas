import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { LoadBalancerTargetGroup } from '../../interface/loadBalancer/LbTargetGroup';

export class NCloudLbTargetGroup
    implements LoadBalancerTargetGroup, NCloudModel
{
    id: string;
    name?: string;
    port?: number;
    protocol: 'TCP' | 'UDP' | 'PROXY_TCP' | 'HTTP' | 'HTTPS';
    description?: string;
    healthCheck?: {
        cycle?: number;
        downThreshold?: number;
        upThreshold?: number;
        httpMethod?: 'HEAD' | 'GET';
        port?: number;
        protocol: 'TCP' | 'HTTP' | 'HTTPS';
        urlPath?: string;
    };
    targetType?: string;
    vpcNo: string;
    useStickySession?: boolean;
    useProxyProtocol?: boolean;
    algorithmType?: 'RR' | 'SIPHS' | 'LC' | 'MH';
    targetGroupNo?: string;
    loadBalancerInstanceNo?: string;
    targetNoList?: string[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_lb_target_group';
        this.priority = ResourcePriority.LOAD_BALANCER_TARGET_GROUP;

        this.protocol = json.protocol;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.vpc_no`;

        this.id = json.id || `lb-target-group-${Date.now()}`;

        if (json.name) this.name = json.name;
        if (json.port) this.port = json.port;
        if (json.description) this.description = json.description;
        if (json.healthCheck) this.healthCheck = json.healthCheck;
        if (json.targetType) this.targetType = json.targetType;
        if (json.useStickySession !== undefined)
            this.useStickySession = json.useStickySession;
        if (json.useProxyProtocol !== undefined)
            this.useProxyProtocol = json.useProxyProtocol;
        if (json.algorithmType) this.algorithmType = json.algorithmType;

        if (json.targetGroupNo) this.targetGroupNo = json.targetGroupNo;
        if (json.loadBalancerInstanceNo)
            this.loadBalancerInstanceNo = json.loadBalancerInstanceNo;
        if (json.targetNoList) this.targetNoList = json.targetNoList;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            protocol: this.protocol,
            vpc_no: this.vpcNo,
        };

        if (this.name) properties.name = this.name;
        if (this.port) properties.port = this.port;
        if (this.description) properties.description = this.description;
        if (this.healthCheck)
            properties.health_check = {
                cycle: this.healthCheck.cycle,
                down_threshold: this.healthCheck.downThreshold,
                up_threshold: this.healthCheck.upThreshold,
                http_method: this.healthCheck.httpMethod,
                port: this.healthCheck.port,
                protocol: this.healthCheck.protocol,
                url_path: this.healthCheck.urlPath,
            };
        if (this.targetType) properties.target_type = this.targetType;
        if (this.useStickySession !== undefined)
            properties.use_sticky_session = this.useStickySession;
        if (this.useProxyProtocol !== undefined)
            properties.use_proxy_protocol = this.useProxyProtocol;
        if (this.algorithmType) properties.algorithm_type = this.algorithmType;

        return properties;
    }
}
