import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { CdssConfigGroup } from '../../interface/cloudDataStreamingService/CdssConfigGroup';

export class NCloudCdssConfigGroup implements CdssConfigGroup, NCloudModel {
    id: string;
    name: string;
    kafkaVersionCode: string;
    description?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_cdss_config_group';
        this.priority = ResourcePriority.CDSS_CONFIG_GROUP;

        this.name = json.name;
        this.kafkaVersionCode = json.kafkaVersionCode;

        this.id = json.id || `cdss-config-${Date.now()}`;

        if (json.description) this.description = json.description;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            kafka_version_code: this.kafkaVersionCode,
        };

        if (this.description) properties.description = this.description;

        return properties;
    }
}
