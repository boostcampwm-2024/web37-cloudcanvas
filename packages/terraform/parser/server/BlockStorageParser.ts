import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudBlockStorage } from '../../model/server/NCloudBlockStorage';

export class BlockStorageParser extends BaseResourceParser {
    protected resourceType = ['block_storage'];

    protected createModel(properties: any): NCloudBlockStorage {
        return new NCloudBlockStorage({
            size: properties.size,
            serverName: properties.server_name,
            name: this.getNameOrDefault(properties, 'block-storage'),
            description: properties.description,
            diskDetailType: properties.disk_detail_type,
            stopInstanceBeforeDetaching:
                properties.stop_instance_before_detaching,
            zone: properties.zone,
            snapshotNo: properties.snapshot_no,
            hypervisorType: properties.hypervisor_type,
            volumeType: properties.volume_type,
            returnProtection: properties.return_protection,
        });
    }
}
