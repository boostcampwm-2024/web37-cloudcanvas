import { NetworkAclRuleConfig } from './NetworkAclRuleConfig';

export interface NetworkAclRule {
    networkAclNo: string;
    inbound?: NetworkAclRuleConfig[];
    outbound?: NetworkAclRuleConfig[];
}
