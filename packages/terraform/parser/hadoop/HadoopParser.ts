import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudHadoop } from '../../model/hadoop/NCloudHadoop';

export class HadoopParser extends BaseResourceParser {
    protected resourceType = ['hadoop'];

    protected createModel(properties: any): NCloudHadoop {
        return new NCloudHadoop({
            vpcName: properties.vpc_name,
            clusterName: properties.cluster_name,
            adminUserName: properties.admin_user_name,
            adminUserPassword: properties.admin_user_password,
            loginKeyName: properties.login_key_name,
            edgeNodeSubnetName: properties.edge_node_subnet_name,
            masterNodeSubnetName: properties.master_node_subnet_name,
            workerNodeSubnetName: properties.worker_node_subnet_name,
            bucketName: properties.bucket_name,
            masterNodeDataStorageType: properties.master_node_data_storage_type,
            workerNodeDataStorageType: properties.worker_node_data_storage_type,
            masterNodeDataStorageSize: properties.master_node_data_storage_size,
            workerNodeDataStorageSize: properties.worker_node_data_storage_size,

            imageProductCode: properties.image_product_code,
            engineVersionCode: properties.engine_version_code,
            edgeNodeProductCode: properties.edge_node_product_code,
            masterNodeProductCode: properties.master_node_product_code,
            workerNodeProductCode: properties.worker_node_product_code,
            addOnCodeList: properties.add_on_code_list,
            workerNodeCount: properties.worker_node_count,
            useKdc: properties.use_kdc,
            kdcRealm: properties.kdc_realm,
            kdcPassword: properties.kdc_password,
            useBootstrapScript: properties.use_bootstrap_script,
            bootstrapScript: properties.bootstrap_script,
            useDataCatalog: properties.use_data_catalog,
        });
    }
}
