export interface BlockStorageSnapshot {
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
}
