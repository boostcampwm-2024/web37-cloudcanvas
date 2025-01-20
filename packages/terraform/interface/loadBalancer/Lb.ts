export interface LoadBalancer {
    id: string;
    name?: string;
    type: 'APPLICATION' | 'NETWORK' | 'NETWORK_PROXY';
    subnetNoList: string[];
    networkType?: 'PUBLIC' | 'PRIVATE';
    idleTimeout?: number;
    throughputType?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'DYNAMIC' | 'XLARGE';
    description?: string;
    loadBalancerNo?: string;
    domain?: string;
    vpcNo?: string;
    ipList?: string[];
}
