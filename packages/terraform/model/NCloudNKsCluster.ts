import { KsCluster } from '../interface/KsCluster';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudNKsCluster implements KsCluster, NCloudModel {
    name?: string;
    serviceType: string;
    priority: ResourcePriority;
    hypervisorCode?: string;
    clusterType: string;
    k8sVersion: string;
    loginKeyName: string;
    lbPublicSubnetNo?: string | undefined;
    lbPrivateSubnetNo?: string | undefined;
    kubeNetworkPlugin?: string | undefined;
    subnetNoList: string[];
    vpcNo: string;
    publicNetwork?: boolean | undefined;
    zone: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_nks_cluster';
        this.priority = ResourcePriority.NKS_CLUSTER;
        this.name = json.name;
        if (json.hypervisorCode) {
            this.hypervisorCode = json.hypervisorCode;
        }
        this.clusterType = json.clusterType;
        this.k8sVersion = json.k8sVersion;
        this.loginKeyName = `ncloud_login_key.${json.loginKeyName.toLowerCase()}.key_name`;
        if (json.lbPublicSubnetNo) {
            this.lbPublicSubnetNo = json.lbPublicSubnetNo;
        }
        if (json.lbPrivateSubnetNo) {
            this.lbPrivateSubnetNo = json.lbPrivateSubnetNo;
        }
        if (json.kubeNetworkPlugin) {
            this.kubeNetworkPlugin = json.kubeNetworkPlugin;
        }
        if (Array.isArray(json.subnetNoList)) {
            this.subnetNoList = json.subnetNoList.map(
                (name: string) => `ncloud_subnet.${name.toLowerCase()}.id`,
            );
        } else {
            this.subnetNoList = [
                `ncloud_subnet.${json.subnetNoList.toLowerCase()}.id`,
            ];
        }
        this.vpcNo = `ncloud_vpc.${json.vpcNo.toLowerCase()}.id`;
        if (json.publicNetwork) {
            this.publicNetwork = json.publicNetwork;
        }
        this.zone = json.zone;
    }
    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            cluster_type: this.clusterType,
            k8s_version: this.k8sVersion,
            login_key_name: this.loginKeyName,
            subnet_no_list: this.subnetNoList,
            vpc_no: this.vpcNo,
            zone: this.zone,
        };
        if (this.hypervisorCode) {
            properties.hypervisor_code = this.hypervisorCode;
        }
        if (this.lbPublicSubnetNo) {
            properties.lb_public_subnet_no = this.lbPublicSubnetNo;
        }
        if (this.lbPrivateSubnetNo) {
            properties.lb_private_subnet_no = this.lbPrivateSubnetNo;
        }
        if (this.kubeNetworkPlugin) {
            properties.kube_network_plugin = this.kubeNetworkPlugin;
        }
        if (this.publicNetwork) {
            properties.public_network = this.publicNetwork;
        }
        return properties;
    }
}
