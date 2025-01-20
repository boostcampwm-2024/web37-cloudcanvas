interface HadoopServer {
    serverInstanceNo: string;
    serverName: string;
    serverRole: string;
    zoneCode: string;
    subnetNo: string;
    productCode: string;
    isPublicSubnet: boolean;
    cpuCount: number;
    memorySize: number;
    dataStorageType: string;
    dataStorageSize: number;
    uptime: string;
    createDate: string;
}

export interface Hadoop {
    id: string;
    vpcNo: string;
    clusterName: string;
    clusterTypeCode: 'CORE_HADOOP_WITH_SPARK';
    adminUserName: string;
    adminUserPassword: string;
    loginKeyName: string;
    edgeNodeSubnetNo: string;
    masterNodeSubnetNo: string;
    workerNodeSubnetNo: string;
    bucketName: string;
    masterNodeDataStorageType: 'SSD' | 'HDD';
    workerNodeDataStorageType: 'SSD' | 'HDD';
    masterNodeDataStorageSize: number;
    workerNodeDataStorageSize: number;
    imageProductCode?: string;
    engineVersionCode?: string;
    edgeNodeProductCode?: string;
    masterNodeProductCode?: string;
    workerNodeProductCode?: string;
    addOnCodeList?: (
        | 'PRESTO'
        | 'HBASE'
        | 'IMPALA'
        | 'KUDU'
        | 'TRINO'
        | 'NIFI'
    )[];
    workerNodeCount?: number;
    useKdc?: boolean;
    kdcRealm?: string;
    kdcPassword?: string;
    useBootstrapScript?: boolean;
    bootstrapScript?: string;
    useDataCatalog?: boolean;
    regionCode?: string;
    ambariServerHost?: string;
    clusterDirectAccessAccount?: string;
    isHa?: boolean;
    domain?: string;
    accessControlGroupNoList?: string[];
    hadoopServerList?: HadoopServer[];
}
