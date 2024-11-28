import { ResourcePriority } from '../enum/ResourcePriority';
import { NCloudModel } from '../interface/NCloudModel';
import { PublicIp } from '../interface/PublicIp';

export class NCloudPublicIP implements PublicIp, NCloudModel {
    id: string;
    name: string;
    serverInstanceNo?: string;
    publicIp?: string;
    kindType?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_public_ip';
        this.priority = ResourcePriority.PUBLIC_IP;
        this.id = json.id || `publicIp-${Date.now()}`;
        this.name = json.name.toLowerCase();
        this.serverInstanceNo = `ncloud_server.${json.serverName}.id`;
    }

    getProperties() {
        return {
            server_instance_no: this.serverInstanceNo,
        };
    }
}
