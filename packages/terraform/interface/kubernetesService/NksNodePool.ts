interface Node {
    name: string;
    instanceNo: string;
    spec: string;
    privateIp: string;
    publicIp: string;
    nodeStatus: string;
    containerVersion: string;
    kernelVersion: string;
}

interface Label {
    key: string;
    value: string;
}

interface Taint {
    key: string;
    value: string;
    effect: string;
}

interface Autoscale {
    enabled: boolean;
    min: number;
    max: number;
}

export interface NksNodePool {
    id: string;
    nodePoolName: string;
    clusterUuid: string;
    nodeCount?: number;
    productCode?: string;
    serverSpecCode?: string;
    storageSize?: number;
    softwareCode?: string;
    serverRoleId?: string;
    autoscale?: Autoscale;
    subnetNoList?: string[];
    k8sVersion?: string;
    label?: Label[];
    taint?: Taint[];
    // Read-only attributes
    instanceNo?: string;
    nodes?: Node[];
}
