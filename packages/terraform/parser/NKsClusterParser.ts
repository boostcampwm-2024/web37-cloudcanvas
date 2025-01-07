import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudNKsCluster } from '../model/kubernetesService/NCloudNKsCluster';

export class NKsClusterParser extends BaseResourceParser {
    protected resourceType = ['nkscluster'];

    protected createModel(properties: any): NCloudNKsCluster {
        return new NCloudNKsCluster({
            name: properties.name,
            hypervisorCode: properties.hypervisorCode,
            clusterType: properties.clusterType,
            k8sVersion: properties.k8sVersion,
            loginKeyName: properties.loginKeyName,
            lbPrivateSubnetNo: properties.lbPrivateSubnet,
            lbPublicSubnetNo: properties.lbPublicSubnet,
            subnetNoList: properties.subnet,
            vpcNo: properties.vpc,
            publicNetwork: properties.publicNetwork,
            zone: properties.zone,
        });
    }
}
