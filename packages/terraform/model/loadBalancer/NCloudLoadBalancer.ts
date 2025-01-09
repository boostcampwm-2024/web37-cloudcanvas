import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { LoadBalancer } from '../../interface/loadBalancer/LoadBalancer';

export class NCloudLoadBalancer implements LoadBalancer, NCloudModel {
    id: string;
    name?: string;
    ruleList: {
        protocolType: 'HTTP' | 'HTTPS' | 'TCP' | 'SSL';
        loadBalancerPort: number;
        serverPort: number;
        l7HealthCheckPath?: string;
        certificateName?: string;
        proxyProtocolUseYn?: 'Y' | 'N';
    }[];
    algorithmType?: 'RR' | 'LC';
    description?: string;
    serverInstanceNoList?: string[];
    networkUsageType?: 'PBLIP' | 'PRVT';
    region?: string;
    zone?: string;
    instanceNo?: string;
    virtualIp?: string;
    createDate?: string;
    domainName?: string;
    instanceStatusName?: string;
    instanceStatus?: string;
    instanceOperation?: string;
    isHttpKeepAlive?: boolean;
    connectionTimeout?: number;
    loadBalancedServerInstanceList?: string[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_load_balancer';
        this.priority = ResourcePriority.LOAD_BALANCER;

        this.id = json.id || `LoadBalancer-${Date.now()}`;
        this.ruleList = json.ruleList.map((rule: any) => ({
            protocolType: rule.protocolType,
            loadBalancerPort: rule.loadBalancerPort,
            serverPort: rule.serverPort,
            l7HealthCheckPath: rule.l7HealthCheckPath,
            certificateName: rule.certificateName,
            proxyProtocolUseYn: rule.proxyProtocolUseYn,
        }));

        if (json.name) this.name = json.name.toLowerCase();
        if (json.algorithmType) this.algorithmType = json.algorithmType;
        if (json.description) this.description = json.description;
        if (json.serverInstanceNoList)
            this.serverInstanceNoList = json.serverInstanceNoList;
        if (json.networkUsageType)
            this.networkUsageType = json.networkUsageType;
        if (json.region) this.region = json.region;
        if (json.zone) this.zone = json.zone;

        if (json.instanceNo) this.instanceNo = json.instanceNo;
        if (json.virtualIp) this.virtualIp = json.virtualIp;
        if (json.createDate) this.createDate = json.createDate;
        if (json.domainName) this.domainName = json.domainName;
        if (json.instanceStatusName)
            this.instanceStatusName = json.instanceStatusName;
        if (json.instanceStatus) this.instanceStatus = json.instanceStatus;
        if (json.instanceOperation)
            this.instanceOperation = json.instanceOperation;
        if (json.isHttpKeepAlive !== undefined)
            this.isHttpKeepAlive = json.isHttpKeepAlive;
        if (json.connectionTimeout)
            this.connectionTimeout = json.connectionTimeout;
        if (json.loadBalancedServerInstanceList) {
            this.loadBalancedServerInstanceList =
                json.loadBalancedServerInstanceList;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            rule_list: this.ruleList.map((rule) => ({
                protocol_type: rule.protocolType,
                load_balancer_port: rule.loadBalancerPort,
                server_port: rule.serverPort,
                l7_health_check_path: rule.l7HealthCheckPath,
                certificate_name: rule.certificateName,
                proxy_protocol_use_yn: rule.proxyProtocolUseYn,
            })),
        };

        if (this.name) properties.name = this.name;
        if (this.algorithmType) properties.algorithm_type = this.algorithmType;
        if (this.description) properties.description = this.description;
        if (this.serverInstanceNoList) {
            properties.server_instance_no_list = this.serverInstanceNoList;
        }
        if (this.networkUsageType)
            properties.network_usage_type = this.networkUsageType;
        if (this.region) properties.region = this.region;
        if (this.zone) properties.zone = this.zone;

        return properties;
    }
}
