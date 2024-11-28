import { NetworkInterface } from '../interface/NetworkInterface';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudNetworkInterface implements NetworkInterface, NCloudModel {
    id: string;
    name: string;
    subnetNo: string;
    accessControlGroups: string[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_network_interface';
        this.priority = ResourcePriority.NETWORK_INTERFACE;
        this.id = json.id || `nic-${Date.now()}`;
        this.name = json.name || 'nic';
        this.subnetNo = `ncloud_subnet.${json.subnetName}.id`;
        this.accessControlGroups = [
            `ncloud_access_control_group.${json.acgName}.id`,
        ];
    }

    getProperties() {
        return {
            subnet_no: this.subnetNo,
            name: this.name,
            access_control_groups: this.accessControlGroups,
        };
    }
}
