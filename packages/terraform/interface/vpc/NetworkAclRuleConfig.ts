export interface NetworkAclRuleConfig {
    priority: number;
    protocol: 'TCP' | 'UDP' | 'ICMP';
    ruleAction: 'ALLOW' | 'DROP';
    ipBlock?: string;
    denyAllowGroupNo?: string;
    portRange?: string;
    description?: string;
}
