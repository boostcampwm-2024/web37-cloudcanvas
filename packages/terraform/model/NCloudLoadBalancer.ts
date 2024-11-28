import { LoadBalancer } from '../interface/LoadBalancer';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudLoadBalancer implements LoadBalancer, NCloudModel {
    id: string;
    name: string;
    networkType: string;
    type: string;
    subnetNoList: string[];
    idleTimeout?: number;
    throughputType?: string;
    description?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_lb';
        this.priority = ResourcePriority.LOAD_BALANCER;
        this.id = json.id;
        this.name = json.name.toLowerCase();
        this.networkType = json.networkType || 'PUBLIC';
        this.type = json.type || 'APPLICATION';
        if (Array.isArray(json.subnetName)) {
            this.subnetNoList = json.subnetName.map(
                (name: string) => `ncloud_subnet.${name.toLowerCase()}.id`,
            );
        } else {
            this.subnetNoList = [
                `ncloud_subnet.${json.subnetName.toLowerCase()}.id`,
            ];
        }
    }

    getProperties() {
        return {
            name: this.name,
            type: this.type,
            network_type: this.networkType,
            subnet_no_list: this.subnetNoList,
        };
    }
}
