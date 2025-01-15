interface NodeInstance {
    computeInstanceName: string;
    computeInstanceNo: string;
    nodeType: string;
    privateIp: string;
    serverStatus: string;
    subnet: string;
}

interface SearchEngine {
    versionCode: string;
    userName: string;
    userPassword: string;
    dashboardPort: string;
}

interface NodeConfig {
    isDualManager?: boolean;
    productCode: string;
    subnetNo: string;
    count?: number;
    storageSize?: number;
    // Read-only attributes
    acgId?: string;
    acgName?: string;
}

export interface SesCluster {
    id: string;
    clusterName: string;
    osImageCode: string;
    vpcNo: string;
    searchEngine: SearchEngine;
    managerNode: NodeConfig;
    dataNode: NodeConfig;
    masterNode?: NodeConfig;
    loginKeyName: string;
    serviceGroupInstanceNo?: string;
    managerNodeInstanceNoList?: string[];
    clusterNodeList?: NodeInstance[];
}
