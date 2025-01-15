export interface LoadBalancer {
    id: string;
    name?: string;
    ruleList: LbRule[];
    algorithmType?: 'RR' | 'LC';
    description?: string;
    serverInstanceNoList?: string[];
    networkUsageType?: 'PBLIP' | 'PRVT';
    region?: string;
    zone?: string;
    instanceNo?: string;
    virtualIp?: string;
    createDate?: string;
    domainName?: string;
    instanceStatusName?: string;
    instanceStatus?: string;
    instanceOperation?: string;
    isHttpKeepAlive?: boolean;
    connectionTimeout?: number;
    loadBalancedServerInstanceList?: string[];
}
