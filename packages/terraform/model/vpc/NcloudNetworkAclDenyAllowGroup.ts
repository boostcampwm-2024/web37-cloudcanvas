import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { NetworkAclDenyAllowGroup } from '../../interface/vpc/NetworkAclDenyAllowGroup';

export class NCloudNetworkAclDenyAllowGroup
    implements NetworkAclDenyAllowGroup, NCloudModel
{
    id: string;
    vpcNo: string;
    ipList: string[];
    name?: string;
    description?: string;
    networkAclDenyAllowGroupNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_network_acl_deny_allow_group';
        this.priority = ResourcePriority.NETWORK_ACL_DENY_ALLOW_GROUP;

        this.id = json.id || `deny-allow-group-${Date.now()}`;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.ipList = json.ipList;

        if (json.name) this.name = json.name.toLowerCase();
        if (json.description) this.description = json.description;
        if (json.networkAclDenyAllowGroupNo) {
            this.networkAclDenyAllowGroupNo = json.networkAclDenyAllowGroupNo;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
            ip_list: this.ipList,
        };

        if (this.name) properties.name = this.name;
        if (this.description) properties.description = this.description;

        return properties;
    }
}
