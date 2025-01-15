export interface LoadBalancerSSLCertificate {
    id: string;
    certificateName: string;
    privateKey: string;
    publicKeyCertificate: string;
    certificateChain?: string;
}
