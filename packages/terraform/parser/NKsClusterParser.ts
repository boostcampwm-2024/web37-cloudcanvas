import { BaseResourceParser } from './BaseResourceParser';
import { NCloudNKsCluster } from '../model/kubernetesService/NCloudNKsCluster';

export class NKsClusterParser extends BaseResourceParser {
    protected resourceType = ['nkscluster'];

    protected createModel(properties: any): NCloudNKsCluster {
        return new NCloudNKsCluster({
            name: properties.name,
            hypervisorCode: properties.hypervisor_code,
            clusterType: properties.cluster_type,
            k8sVersion: properties.k8s_version,
            loginKeyName: properties.login_key_name,
            lbPrivateSubnetNo: properties.lb_private_subnet_no,
            lbPublicSubnetNo: properties.lb_public_subnet_no,
            subnetNoList: properties.subnet_no_list,
            vpcNo: properties.vpc,
            publicNetwork: properties.public_network,
            zone: properties.zone,
        });
    }
}
