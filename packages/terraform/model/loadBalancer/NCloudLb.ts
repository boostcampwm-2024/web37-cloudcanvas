import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { LoadBalancer } from '../../interface/loadBalancer/Lb';

export class NCloudLb implements LoadBalancer, NCloudModel {
    id: string;
    name?: string;
    type: 'APPLICATION' | 'NETWORK' | 'NETWORK_PROXY';
    subnetNoList: string[];
    networkType?: 'PUBLIC' | 'PRIVATE';
    idleTimeout?: number;
    throughputType?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'DYNAMIC' | 'XLARGE';
    description?: string;
    loadBalancerNo?: string;
    domain?: string;
    vpcNo?: string;
    ipList?: string[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_lb';
        this.priority = ResourcePriority.LOAD_BALANCER;

        this.type = json.type;
        this.subnetNoList = json.subnetNoList.map(
            (name: string) => `ncloud_subnet.${name.toLowerCase()}.id`,
        );

        this.id = json.id || `lb-${Date.now()}`;

        if (json.name) this.name = json.name;
        if (json.networkType) this.networkType = json.networkType;
        if (json.idleTimeout) this.idleTimeout = json.idleTimeout;
        if (json.throughputType) this.throughputType = json.throughputType;
        if (json.description) this.description = json.description;

        if (json.loadBalancerNo) this.loadBalancerNo = json.loadBalancerNo;
        if (json.domain) this.domain = json.domain;
        if (json.vpcNo) this.vpcNo = json.vpcNo;
        if (json.ipList) this.ipList = json.ipList;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            type: this.type,
            subnet_no_list: this.subnetNoList,
        };

        if (this.name) properties.name = this.name;
        if (this.networkType) properties.network_type = this.networkType;
        if (this.idleTimeout) properties.idle_timeout = this.idleTimeout;
        if (this.throughputType)
            properties.throughput_type = this.throughputType;
        if (this.description) properties.description = this.description;

        return properties;
    }
}
