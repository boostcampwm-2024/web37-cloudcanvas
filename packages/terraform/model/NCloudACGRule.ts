import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';
import { ACGRule } from '../interface/ACGRule';

export class NCloudACGRule implements ACGRule, NCloudModel {
    name: string;
    protocol: string;
    ipBlock: string;
    portRange: string;
    serviceType: string;
    priority: ResourcePriority;
    accessControlGroupNo: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group_rule';
        this.priority = ResourcePriority.ACG_RULE;
        this.name = json.name.toLowerCase();
        this.protocol = json.protocol;
        this.ipBlock = json.ipBlock;
        this.portRange = json.portRange;
        this.accessControlGroupNo = `ncloud_access_control_group.${json.acgName.toLowerCase()}.id`;
    }

    getProperties() {
        return {
            access_control_group_no: this.accessControlGroupNo,
            inbound: {
                protocol: this.protocol,
                ip_block: this.ipBlock,
                port_range: this.portRange,
            },
        };
    }
}
