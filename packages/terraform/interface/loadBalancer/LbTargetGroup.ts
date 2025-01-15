interface HealthCheck {
    cycle?: number;
    downThreshold?: number;
    upThreshold?: number;
    httpMethod?: 'HEAD' | 'GET';
    port?: number;
    protocol: 'TCP' | 'HTTP' | 'HTTPS';
    urlPath?: string;
}

export interface LoadBalancerTargetGroup {
    id: string;
    name?: string;
    port?: number;
    protocol: 'TCP' | 'UDP' | 'PROXY_TCP' | 'HTTP' | 'HTTPS';
    description?: string;
    healthCheck?: HealthCheck;
    targetType?: string;
    vpcNo: string;
    useStickySession?: boolean;
    useProxyProtocol?: boolean;
    algorithmType?: 'RR' | 'SIPHS' | 'LC' | 'MH';
    targetGroupNo?: string;
    loadBalancerInstanceNo?: string;
    targetNoList?: string[];
}
