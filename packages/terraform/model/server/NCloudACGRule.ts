import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { ACGRule } from '../../interface/server/ACGRule';

export class NCloudACGRule implements ACGRule, NCloudModel {
    accessControlGroupNo: string;
    inbound?: {
        protocol: 'TCP' | 'UDP' | 'ICMP';
        ipBlock?: string;
        sourceAccessControlGroupNo?: string;
        portRange?: string;
        description?: string;
    }[];
    outbound?: {
        protocol: 'TCP' | 'UDP' | 'ICMP';
        ipBlock?: string;
        sourceAccessControlGroupNo?: string;
        portRange?: string;
        description?: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group_rule';
        this.priority = ResourcePriority.ACG_RULE;
        this.accessControlGroupNo = `ncloud_access_control_group.${json.acgName.toLowerCase()}.id`;

        if (json.inbound) this.inbound = json.inbound;
        if (json.outbound) this.outbound = json.outbound;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            access_control_group_no: this.accessControlGroupNo,
        };

        if (this.inbound) properties.inbound = this.inbound;
        if (this.outbound) properties.outbound = this.outbound;

        return properties;
    }
}
