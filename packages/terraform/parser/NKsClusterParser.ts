import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudNKsCluster } from '../model/NCloudNKsCluster';

export class NKsClusterParser extends BaseResourceParser {
    protected resourceType = ['nkscluster'];

    protected validateProperties(properties: any): void {
        if (!properties.clusterType) {
            throw new ValidationError('NKsCluster', 'clusterType', 'cluster type이 필수입니다');
        }
        if (!properties.k8sVersion) {
            throw new ValidationError('NKsCluster', 'k8sVersion', 'kubernetes version이 필수입니다');
        }
        if (!properties.loginKeyName) {
            throw new ValidationError('NKsCluster', 'loginKeyName', 'login key name이 필수입니다');
        }
        if (!properties.zone) {
            throw new ValidationError('NKsCluster', 'zone', 'zone이 필수입니다');
        }
    }

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
            zone: properties.zone
        });
    }
}