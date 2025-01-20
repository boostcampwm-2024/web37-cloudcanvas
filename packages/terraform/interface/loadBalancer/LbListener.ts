export interface LoadBalancerListener {
    id: string;
    loadBalancerNo: string;
    targetGroupNo: string;
    port: number;
    protocol: 'HTTP' | 'HTTPS' | 'TCP' | 'UDP' | 'TLS';
    tlsMinVersionType?: 'TLSV10' | 'TLSV11' | 'TLSV12';
    useHttp2?: boolean;
    sslCertificateNo?: string;
    listenerNo?: string;
    ruleNoList?: string[];
}
