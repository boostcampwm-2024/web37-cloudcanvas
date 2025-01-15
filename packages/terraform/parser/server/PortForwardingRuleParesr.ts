import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudPortForwardingRule } from '../../model/server/NCloudPortForwardingRule';

export class PortForwardingRuleParser extends BaseResourceParser {
    protected resourceType = ['port_forwarding_rule'];

    protected createModel(properties: any): NCloudPortForwardingRule {
        return new NCloudPortForwardingRule({
            serverName: properties.server_name,
            portForwardingExternalPort:
                properties.port_forwarding_external_port,
            portForwardingInternalPort:
                properties.port_forwarding_internal_port,
            portForwardingConfigurationNo:
                properties.port_forwarding_configuration_no,
            zone: properties.zone,
        });
    }
}
