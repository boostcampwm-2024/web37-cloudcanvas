import { ACG } from '../../interface/server/ACG';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudACG implements ACG, NCloudModel {
    id: string;
    name?: string;
    vpcNo: string;
    description?: string;
    isDefault?: boolean;
    accessControlGroupNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group';
        this.priority = ResourcePriority.ACG;
        this.id = json.id || `ACG-${Date.now()}`;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;

        if (json.name) this.name = json.name.toLowerCase();
        if (json.description) this.description = json.description;
        if (json.isDefault !== undefined) this.isDefault = json.isDefault;
        if (json.accessControlGroupNo) this.accessControlGroupNo = json.accessControlGroupNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
        };

        if (this.name) properties.name = this.name;
        if (this.description) properties.description = this.description;

        return properties;
    }
}
