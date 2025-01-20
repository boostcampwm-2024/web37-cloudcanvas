interface LbRule {
    protocolType: 'HTTP' | 'HTTPS' | 'TCP' | 'SSL';
    loadBalancerPort: number;
    serverPort: number;
    l7HealthCheckPath?: string;
    certificateName?: string;
    proxyProtocolUseYn?: 'Y' | 'N';
}
