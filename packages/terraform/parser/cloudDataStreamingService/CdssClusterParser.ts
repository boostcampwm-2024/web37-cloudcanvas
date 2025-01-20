import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudCdssCluster } from '../../model/cloudDataStreamingService/NCloudCdssCluster';

export class CdssClusterParser extends BaseResourceParser {
    protected resourceType = ['cdss_cluster'];

    protected createModel(properties: any): NCloudCdssCluster {
        return new NCloudCdssCluster({
            name: properties.name,
            kafkaVersionCode: properties.kafka_version_code,
            configGroupName: properties.config_group_name,
            vpcName: properties.vpc_name,
            osImage: properties.os_image,
            cmak: {
                userName: properties.cmak.user_name,
                userPassword: properties.cmak.user_password,
            },
            managerNode: {
                nodeProductCode: properties.manager_node.node_product_code,
                subnetName: properties.manager_node.subnet_name,
            },
            brokerNodes: {
                nodeProductCode: properties.broker_nodes.node_product_code,
                subnetName: properties.broker_nodes.subnet_name,
                nodeCount: properties.broker_nodes.node_count,
                storageSize: properties.broker_nodes.storage_size,
            },
        });
    }
}
