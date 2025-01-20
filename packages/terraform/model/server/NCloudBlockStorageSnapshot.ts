import { BlockStorageSnapshot } from '../../interface/server/BlockStorageSnapshot';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudBlockStorageSnapshot
    implements BlockStorageSnapshot, NCloudModel
{
    blockStorageInstanceNo: string;
    name?: string;
    description?: string;
    instanceNo?: string;
    volumeSize?: number;
    instanceStatus?: string;
    instanceStatusName?: string;
    instanceOperation?: string;
    originalBlockStorageInstanceNo?: string;
    originalBlockStorageName?: string;
    serverImageProductCode?: string;
    osInformation?: string;
    hypervisorType?: 'XEN' | 'KVM';
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_block_storage_snapshot';
        this.priority = ResourcePriority.BLOCK_STORAGE_SNAPSHOT;

        // Required fields
        this.blockStorageInstanceNo = `ncloud_block_storage.${json.blockStorageName.toLowerCase()}.id`;

        if (json.name) this.name = json.name;
        if (json.description) this.description = json.description;
        if (json.hypervisorType) this.hypervisorType = json.hypervisorType;

        if (json.instanceNo) this.instanceNo = json.instanceNo;
        if (json.volumeSize) this.volumeSize = json.volumeSize;
        if (json.instanceStatus) this.instanceStatus = json.instanceStatus;
        if (json.instanceStatusName)
            this.instanceStatusName = json.instanceStatusName;
        if (json.instanceOperation)
            this.instanceOperation = json.instanceOperation;
        if (json.originalBlockStorageInstanceNo) {
            this.originalBlockStorageInstanceNo =
                json.originalBlockStorageInstanceNo;
        }
        if (json.originalBlockStorageName)
            this.originalBlockStorageName = json.originalBlockStorageName;
        if (json.serverImageProductCode)
            this.serverImageProductCode = json.serverImageProductCode;
        if (json.osInformation) this.osInformation = json.osInformation;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            block_storage_instance_no: this.blockStorageInstanceNo,
        };

        if (this.name) properties.name = this.name;
        if (this.description) properties.description = this.description;
        if (this.hypervisorType)
            properties.hypervisor_type = this.hypervisorType;

        return properties;
    }
}
