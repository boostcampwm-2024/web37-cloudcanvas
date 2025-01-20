export interface Redis {
    serviceName: string;
    serverNamePrefix: string;
    userName?: string;
    userPassword?: string;
    vpcNo: string;
    subnetNo: string;
    configGroupNo: string;
    mode: 'CLUSTER' | 'SIMPLE';
    imageProductCode?: string;
    productCode?: string;
    shardCount?: number;
    shardCopyCount?: number;
    isHa?: boolean;
    isBackup?: boolean;
    backupFileRetentionPeriod?: number;
    isAutomaticBackup?: boolean;
    backupTime?: string;
    port?: number;
}
