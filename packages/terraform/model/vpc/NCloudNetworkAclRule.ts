import { NetworkAclRule } from '../../interface/vpc/NetworkAclRule';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudNetworkAclRule implements NetworkAclRule, NCloudModel {
    networkAclNo: string;
    inbound?: {
        priority: number;
        protocol: 'TCP' | 'UDP' | 'ICMP';
        ruleAction: 'ALLOW' | 'DROP';
        ipBlock?: string;
        denyAllowGroupNo?: string;
        portRange?: string;
        description?: string;
    }[];
    outbound?: {
        priority: number;
        protocol: 'TCP' | 'UDP' | 'ICMP';
        ruleAction: 'ALLOW' | 'DROP';
        ipBlock?: string;
        denyAllowGroupNo?: string;
        portRange?: string;
        description?: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_network_acl_rule';
        this.priority = ResourcePriority.NETWORK_ACL_RULE;

        this.networkAclNo = `ncloud_network_acl.${json.networkAclName.toLowerCase()}.id`;

        if (json.inbound) this.inbound = json.inbound;
        if (json.outbound) this.outbound = json.outbound;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            network_acl_no: this.networkAclNo,
        };

        if (this.inbound) {
            properties.inbound = this.inbound.map((rule) => ({
                priority: rule.priority,
                protocol: rule.protocol,
                rule_action: rule.ruleAction,
                ip_block: rule.ipBlock,
                deny_allow_group_no: rule.denyAllowGroupNo,
                port_range: rule.portRange,
                description: rule.description,
            }));
        }

        if (this.outbound) {
            properties.outbound = this.outbound.map((rule) => ({
                priority: rule.priority,
                protocol: rule.protocol,
                rule_action: rule.ruleAction,
                ip_block: rule.ipBlock,
                deny_allow_group_no: rule.denyAllowGroupNo,
                port_range: rule.portRange,
                description: rule.description,
            }));
        }

        return properties;
    }
}
