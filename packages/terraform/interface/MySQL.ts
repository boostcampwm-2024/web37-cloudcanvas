export interface MySQL {
    id: string;
    serviceName: string;
    serverNamePrefix: string;
    userName: string;
    userPassword: string;
    hostIp: string;
    databaseName: string;
    subnetNo: string;
    imageProductCode?: string;
    productCode?: string;
    dataStorageType?: 'SSD' | 'HDD' | 'CB1';
    isHa?: boolean;
    isMultiZone?: boolean;
    isStorageEncryption?: boolean;
    isBackup?: boolean;
    backupFileRetentionPeriod?: number;
    backupTime?: string;
    isAutomaticBackup?: boolean;
    port?: number;
    standbyMasterSubnetNo?: string;
}