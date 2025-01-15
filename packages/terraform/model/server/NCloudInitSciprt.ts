import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { InitScript } from '../../interface/server/InitScript';

export class NCloudInitScript implements InitScript, NCloudModel {
    id: string;
    content: string;
    name?: string;
    description?: string;
    osType?: 'LNX' | 'WND';
    initScriptNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_init_script';
        this.priority = ResourcePriority.INIT_SCRIPT;

        this.id = json.id || `init-script-${Date.now()}`;
        this.content = json.content;

        if (json.name) this.name = json.name.toLowerCase();
        if (json.description) this.description = json.description;
        if (json.osType) this.osType = json.osType;

        if (json.initScriptNo) this.initScriptNo = json.initScriptNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            content: this.content,
        };

        if (this.name) properties.name = this.name;
        if (this.description) properties.description = this.description;
        if (this.osType) properties.os_type = this.osType;

        return properties;
    }
}