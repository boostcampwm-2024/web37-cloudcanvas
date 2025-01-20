import { BlockStorage } from '../../interface/server/BlockStorage';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudBlockStorage implements BlockStorage, NCloudModel {
    id: string;
    size: string;
    serverInstanceNo: string;
    name?: string;
    description?: string;
    diskDetailType?: 'SSD' | 'HDD';
    stopInstanceBeforeDetaching?: boolean;
    zone?: string;
    snapshotNo?: string;
    hypervisorType?: 'XEN' | 'KVM';
    volumeType?: 'SSD' | 'HDD' | 'FB1' | 'CB1';
    returnProtection?: boolean;
    blockStorageNo?: string;
    serverName?: string;
    type?: string;
    deviceName?: string;
    productCode?: string;
    status?: string;
    diskType?: string;
    maxIops?: number;
    encryptedVolume?: boolean;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_block_storage';
        this.priority = ResourcePriority.BLOCK_STORAGE;

        this.id = json.id || `block-storage-${Date.now()}`;
        this.size = json.size;
        this.serverInstanceNo = `ncloud_server.${json.serverName.toLowerCase()}.id`;

        if (json.name) this.name = json.name.toLowerCase();
        if (json.description) this.description = json.description;
        if (json.diskDetailType) this.diskDetailType = json.diskDetailType;
        if (json.stopInstanceBeforeDetaching !== undefined) {
            this.stopInstanceBeforeDetaching = json.stopInstanceBeforeDetaching;
        }
        if (json.zone) this.zone = json.zone;
        if (json.snapshotNo) this.snapshotNo = json.snapshotNo;
        if (json.hypervisorType) this.hypervisorType = json.hypervisorType;
        if (json.volumeType) this.volumeType = json.volumeType;
        if (json.returnProtection !== undefined) {
            this.returnProtection = json.returnProtection;
        }

        if (json.blockStorageNo) this.blockStorageNo = json.blockStorageNo;
        if (json.serverName) this.serverName = json.serverName;
        if (json.type) this.type = json.type;
        if (json.deviceName) this.deviceName = json.deviceName;
        if (json.productCode) this.productCode = json.productCode;
        if (json.status) this.status = json.status;
        if (json.diskType) this.diskType = json.diskType;
        if (json.maxIops) this.maxIops = json.maxIops;
        if (json.encryptedVolume !== undefined)
            this.encryptedVolume = json.encryptedVolume;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            size: this.size,
            server_instance_no: this.serverInstanceNo,
        };

        if (this.name) properties.name = this.name;
        if (this.description) properties.description = this.description;
        if (this.diskDetailType)
            properties.disk_detail_type = this.diskDetailType;
        if (this.stopInstanceBeforeDetaching !== undefined) {
            properties.stop_instance_before_detaching =
                this.stopInstanceBeforeDetaching;
        }
        if (this.zone) properties.zone = this.zone;
        if (this.snapshotNo) properties.snapshot_no = this.snapshotNo;
        if (this.hypervisorType)
            properties.hypervisor_type = this.hypervisorType;
        if (this.volumeType) properties.volume_type = this.volumeType;
        if (this.returnProtection !== undefined) {
            properties.return_protection = this.returnProtection;
        }

        return properties;
    }
}
