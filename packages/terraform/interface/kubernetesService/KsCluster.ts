interface LogConfig {
    audit: boolean;
}

interface IpAcl {
    action: 'allow' | 'deny';
    address: string;
    comment?: string;
}

interface OidcConfig {
    issuerUrl: string;
    clientId: string;
    usernamePrefix?: string;
    usernameClaim?: string;
    groupsPrefix?: string;
    groupsClaim?: string;
    requiredClaim?: string;
}

export interface KsCluster {
    name: string;
    hypervisorType?: 'XEN' | 'KVM' | 'RHV';
    clusterType: string;
    k8sVersion?: string;
    loginKeyName: string;
    zone: string;
    vpcNo: string;
    subnetNoList: string[];
    publicNetwork?: boolean;
    lbPrivateSubnetNo: string;
    lbPublicSubnetNo?: string;
    kubeNetworkPlugin?: 'cilium';
    log?: LogConfig;
    oidc?: OidcConfig;
    ipAclDefaultAction?: 'allow' | 'deny';
    ipAcl?: IpAcl[];
    uuid?: string;
    endpoint?: string;
    acgNo?: string;
}
