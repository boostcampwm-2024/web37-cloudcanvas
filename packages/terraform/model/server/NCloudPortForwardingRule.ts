import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { PortForwardingRule } from '../../interface/server/PortForwardingRule';

export class NCloudPortForwardingRule implements PortForwardingRule, NCloudModel {
    id: string;
    serverInstanceNo: string;
    portForwardingExternalPort: string;
    portForwardingInternalPort: string;
    portForwardingConfigurationNo?: string;
    portForwardingPublicIp?: string;
    zone?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_port_forwarding_rule';
        this.priority = ResourcePriority.PORT_FORWARDING_RULE;

        this.serverInstanceNo = `ncloud_server.${json.serverName.toLowerCase()}.id`;
        this.portForwardingExternalPort = json.portForwardingExternalPort;
        this.portForwardingInternalPort = json.portForwardingInternalPort;

        this.id = json.id ||
            `${json.portForwardingConfigurationNo}:${json.zone}:${this.portForwardingExternalPort}`;

        if (json.portForwardingConfigurationNo) {
            this.portForwardingConfigurationNo = json.portForwardingConfigurationNo;
        }

        if (json.portForwardingPublicIp) {
            this.portForwardingPublicIp = json.portForwardingPublicIp;
        }
        if (json.zone) this.zone = json.zone;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            server_instance_no: this.serverInstanceNo,
            port_forwarding_external_port: this.portForwardingExternalPort,
            port_forwarding_internal_port: this.portForwardingInternalPort,
        };

        if (this.portForwardingConfigurationNo) {
            properties.port_forwarding_configuration_no = this.portForwardingConfigurationNo;
        }

        return properties;
    }
}