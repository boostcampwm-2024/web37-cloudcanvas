import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudCdssConfigGroup } from '../../model/cloudDataStreamingService/NCloudCdssConfigGroup';

export class CdssConfigGroupParser extends BaseResourceParser {
    protected resourceType = ['cdss_config_group'];

    protected createModel(properties: any): NCloudCdssConfigGroup {
        return new NCloudCdssConfigGroup({
            name: properties.name,
            kafkaVersionCode: properties.kafka_version_code,
            description: properties.description,
        });
    }
}
