import { KsCluster } from '../../interface/kubernetesService/KsCluster';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudNKsCluster implements KsCluster, NCloudModel {
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
    log?: { audit: boolean };
    oidc?: {
        issuerUrl: string;
        clientId: string;
        usernamePrefix?: string;
        usernameClaim?: string;
        groupsPrefix?: string;
        groupsClaim?: string;
        requiredClaim?: string;
    };
    ipAclDefaultAction?: 'allow' | 'deny';
    ipAcl?: {
        action: 'allow' | 'deny';
        address: string;
        comment?: string;
    }[];
    uuid?: string;
    endpoint?: string;
    acgNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_nks_cluster';
        this.priority = ResourcePriority.NKS_CLUSTER;

        this.name = json.name;
        this.clusterType = json.clusterType;
        this.loginKeyName = `ncloud_login_key.${json.loginKeyName.toLowerCase()}.key_name`;
        this.zone = json.zone;
        this.vpcNo = `ncloud_vpc.${json.vpcNo.toLowerCase()}.id`;
        this.lbPrivateSubnetNo = `ncloud_subnet.${json.lbPrivateSubnetNo.toLowerCase()}.id`;

        if (Array.isArray(json.subnetNoList)) {
            this.subnetNoList = json.subnetNoList.map(
                (name: string) => `ncloud_subnet.${name.toLowerCase()}.id`,
            );
        } else {
            this.subnetNoList = [
                `ncloud_subnet.${json.subnetNoList.toLowerCase()}.id`,
            ];
        }

        if (json.hypervisorType) this.hypervisorType = json.hypervisorType;
        if (json.k8sVersion) this.k8sVersion = json.k8sVersion;
        if (json.lbPublicSubnetNo) {
            this.lbPublicSubnetNo = `ncloud_subnet.${json.lbPublicSubnetNo.toLowerCase()}.id`;
        }
        if (json.kubeNetworkPlugin)
            this.kubeNetworkPlugin = json.kubeNetworkPlugin;
        if (json.publicNetwork !== undefined)
            this.publicNetwork = json.publicNetwork;
        if (json.log) this.log = json.log;
        if (json.oidc)
            this.oidc = {
                issuerUrl: json.oidc.issuerUrl,
                clientId: json.oidc.clientId,
                usernamePrefix: json.oidc.usernamePrefix,
                usernameClaim: json.oidc.usernameClaim,
                groupsPrefix: json.oidc.groupsPrefix,
                groupsClaim: json.oidc.groupsClaim,
                requiredClaim: json.oidc.requiredClaim,
            };
        if (json.ipAclDefaultAction)
            this.ipAclDefaultAction = json.ipAclDefaultAction;
        if (json.ipAcl) this.ipAcl = json.ipAcl;
        if (json.uuid) this.uuid = json.uuid;
        if (json.endpoint) this.endpoint = json.endpoint;
        if (json.acgNo) this.acgNo = json.acgNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            cluster_type: this.clusterType,
            login_key_name: this.loginKeyName,
            zone: this.zone,
            vpc_no: this.vpcNo,
            subnet_no_list: this.subnetNoList,
            lb_private_subnet_no: this.lbPrivateSubnetNo,
        };

        if (this.hypervisorType)
            properties.hypervisor_code = this.hypervisorType;
        if (this.k8sVersion) properties.k8s_version = this.k8sVersion;
        if (this.lbPublicSubnetNo)
            properties.lb_public_subnet_no = this.lbPublicSubnetNo;
        if (this.kubeNetworkPlugin)
            properties.kube_network_plugin = this.kubeNetworkPlugin;
        if (this.publicNetwork !== undefined)
            properties.public_network = this.publicNetwork;
        if (this.log) properties.log = this.log;
        if (this.oidc) {
            properties.oidc = {
                issuer_url: this.oidc.issuerUrl,
                client_id: this.oidc.clientId,
                username_prefix: this.oidc.usernamePrefix,
                username_claim: this.oidc.usernameClaim,
                groups_prefix: this.oidc.groupsPrefix,
                groups_claim: this.oidc.groupsClaim,
                required_claim: this.oidc.requiredClaim,
            };
        }
        if (this.ipAclDefaultAction)
            properties.ip_acl_default_action = this.ipAclDefaultAction;
        if (this.ipAcl) properties.ip_acl = this.ipAcl;

        return properties;
    }
}
