import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSesCluster } from '../../model/searchEngineService/NCloudSesCluster';

export class SesClusterParser extends BaseResourceParser {
    protected resourceType = ['ses_cluster'];

    protected createModel(properties: any): NCloudSesCluster {
        return new NCloudSesCluster({
            clusterName: this.getNameOrDefault(properties, 'ses-cluster'),
            osImageCode: properties.os_image_code,
            vpcName: properties.vpc_name,
            searchEngine: {
                versionCode: properties.search_engine.version_code,
                userName: properties.search_engine.user_name,
                userPassword: properties.search_engine.user_password,
                dashboardPort: properties.search_engine.dashboard_port,
            },
            managerNode: {
                isDualManager: properties.manager_node.is_dual_manager,
                productCode: properties.manager_node.product_code,
                subnetName: properties.manager_node.subnet_name,
            },
            dataNode: {
                productCode: properties.data_node.product_code,
                subnetName: properties.data_node.subnet_name,
                count: properties.data_node.count,
                storageSize: properties.data_node.storage_size,
            },
            masterNode: properties.master_node && {
                productCode: properties.master_node.product_code,
                subnetName: properties.master_node.subnet_name,
                count: properties.master_node.count,
            },
            loginKeyName: properties.login_key_name,
        });
    }
}
