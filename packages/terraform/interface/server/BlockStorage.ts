export interface BlockStorage {
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
}
