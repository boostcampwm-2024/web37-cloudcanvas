import { BaseResourceParser } from './BaseResourceParser';
import { NCloudBlockStorageSnapshot } from '../model/server/NCloudBlockStorageSnapshot';

export class BlockStorageSnapshotParser extends BaseResourceParser {
    protected resourceType = ['block_storage_snapshot'];

    protected createModel(properties: any): NCloudBlockStorageSnapshot {
        return new NCloudBlockStorageSnapshot({
            blockStorageName: properties.block_storage_name,
            name: this.getNameOrDefault(properties, 'snapshot'),
            description: properties.description,
            hypervisorType: properties.hypervisor_type,
        });
    }
}
