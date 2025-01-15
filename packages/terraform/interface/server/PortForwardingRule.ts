export interface PortForwardingRule {
    id: string;
    serverInstanceNo: string;
    portForwardingExternalPort: string;
    portForwardingInternalPort: string;
    portForwardingConfigurationNo?: string;
    portForwardingPublicIp?: string;
    zone?: string;
}
