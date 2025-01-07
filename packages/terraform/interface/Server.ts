import { NetworkInterface } from './NetworkInterface';

export interface Server {
    id: string;
    subnetNo: string;
    serverImageProductCode?: string;
    serverProductCode?: string;
    memberServerImageNo?: string;
    serverImageNumber?: string;
    serverSpecCode?: string;
    description?: string;
    loginKeyName?: string;
    isProtectServerTermination?: boolean;
    initScriptNo?: string;
    networkInterface?: NetworkInterface[];
    isEncryptedBaseBlockStorageVolume?: boolean;
    instanceNo?: string;
    cpuCount?: number;
    memorySize?: number;
    platformType?: string;
    publicIp?: string;
    privateIp?: string;
    serverImageName?: string;
    baseBlockStorageSize?: number;
    baseBlockStorageDiskType?: string;
    baseBlockStorageDiskDetailType?: string;
    vpcNo?: string;
    hypervisorType?: string;
}
