import { NetworkACL } from '../../interface/vpc/NetworkACL';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudNetworkACL implements NetworkACL, NCloudModel {
    id: string;
    name: string;
    vpcNo: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_network_acl';
        this.priority = ResourcePriority.NETWORK_ACL;
        this.id = json.id;
        this.name = json.name.toLowerCase();
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
    }

    getProperties() {
        return {
            vpc_no: this.vpcNo,
        };
    }
}
