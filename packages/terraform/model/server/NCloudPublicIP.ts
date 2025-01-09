import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { PublicIp } from '../../interface/server/PublicIp';

export class NCloudPublicIP implements PublicIp, NCloudModel {
    id: string;
    serverInstanceNo?: string;
    description?: string;
    zone?: string;
    publicIp?: string;
    publicIpNo?: string;
    kindType?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_public_ip';
        this.priority = ResourcePriority.PUBLIC_IP;
        this.id = json.id || `publicIp-${Date.now()}`;

        if (json.serverInstanceNo) {
            this.serverInstanceNo = `ncloud_server.${json.serverName}.id`;
        }
        if (json.description) this.description = json.description;
        if (json.zone) this.zone = json.zone;
        if (json.publicIp) this.publicIp = json.publicIp;
        if (json.publicIpNo) this.publicIpNo = json.publicIpNo;
        if (json.kindType) this.kindType = json.kindType;
    }

    getProperties() {
        const properties: { [key: string]: any } = {};

        if (this.serverInstanceNo) properties.server_instance_no = this.serverInstanceNo;
        if (this.description) properties.description = this.description;
        if (this.zone) properties.zone = this.zone;

        return properties;
    }
}

