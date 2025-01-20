import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudNksNodePool } from '../../model/hadoop/NCloudNksNodePool';

export class NksNodePoolParser extends BaseResourceParser {
    protected resourceType = ['nks_node_pool'];

    protected createModel(properties: any): NCloudNksNodePool {
        return new NCloudNksNodePool({
            nodePoolName: this.getNameOrDefault(properties, 'node-pool'),
            clusterName: properties.cluster_name,
            nodeCount: properties.node_count,
            productCode: properties.product_code,
            serverSpecCode: properties.server_spec_code,
            storageSize: properties.storage_size,
            softwareCode: properties.software_code,
            serverRoleId: properties.server_role_id,
            autoscale: properties.autoscale,
            subnetNoList: properties.subnet_no_list,
            k8sVersion: properties.k8s_version,
            label: properties.label,
            taint: properties.taint,
        });
    }
}
