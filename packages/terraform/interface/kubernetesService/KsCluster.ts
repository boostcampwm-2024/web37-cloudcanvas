export interface KsCluster {
    hypervisorType?: string;
    clusterType: string;
    k8sVersion?: string;
    loginKeyName: string;
    lbPrivateSubnetNo?: string;
    lbPublicSubnetNo?: string;
    kubeNetworkPlugin?: string;
    subnetNoList: string[];
    vpcNo: string;
    publicNetwork?: boolean;
    zone: string;
}
