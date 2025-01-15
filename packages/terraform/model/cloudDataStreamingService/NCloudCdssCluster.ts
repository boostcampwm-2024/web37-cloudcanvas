import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { CdssCluster } from '../../interface/cloudDataStreamingService/CdssCluster';

export class NCloudCdssCluster implements CdssCluster, NCloudModel {
    id: string;
    name: string;
    kafkaVersionCode: string;
    configGroupNo: string;
    vpcNo: string;
    osImage: string;
    cmak: {
        userName: string;
        userPassword: string;
    };
    managerNode: {
        nodeProductCode: string;
        subnetNo: string;
    };
    brokerNodes: {
        nodeProductCode: string;
        subnetNo: string;
        nodeCount: number;
        storageSize: number;
    };
    endpoints?: {
        plaintext?: string[];
        tls?: string[];
        publicEndpointPlaintext?: string[];
        publicEndpointPlaintextListenerPort?: string[];
        publicEndpointTls?: string[];
        publicEndpointTlsListenerPort?: string[];
        hostsPrivateEndpointTls?: string[];
        hostsPublicEndpointTls?: string[];
        zookeeper?: string[];
    };
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_cdss_cluster';
        this.priority = ResourcePriority.CDSS_CLUSTER;

        this.id = json.id || `cdss-cluster-${Date.now()}`;

        this.name = json.name;
        this.kafkaVersionCode = json.kafkaVersionCode;
        this.configGroupNo = `ncloud_cdss_config_group.${json.configGroupName.toLowerCase()}.id`;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.osImage = json.osImage;

        this.cmak = {
            userName: json.cmak.userName,
            userPassword: json.cmak.userPassword,
        };

        this.managerNode = {
            nodeProductCode: json.managerNode.nodeProductCode,
            subnetNo: `ncloud_subnet.${json.managerNode.subnetName.toLowerCase()}.id`,
        };

        this.brokerNodes = {
            nodeProductCode: json.brokerNodes.nodeProductCode,
            subnetNo: `ncloud_subnet.${json.brokerNodes.subnetName.toLowerCase()}.id`,
            nodeCount: json.brokerNodes.nodeCount,
            storageSize: json.brokerNodes.storageSize,
        };

        if (json.endpoints) this.endpoints = json.endpoints;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            kafka_version_code: this.kafkaVersionCode,
            config_group_no: this.configGroupNo,
            vpc_no: this.vpcNo,
            os_image: this.osImage,
            cmak: {
                user_name: this.cmak.userName,
                user_password: this.cmak.userPassword,
            },
            manager_node: {
                node_product_code: this.managerNode.nodeProductCode,
                subnet_no: this.managerNode.subnetNo,
            },
            broker_nodes: {
                node_product_code: this.brokerNodes.nodeProductCode,
                subnet_no: this.brokerNodes.subnetNo,
                node_count: this.brokerNodes.nodeCount,
                storage_size: this.brokerNodes.storageSize,
            },
        };

        return properties;
    }
}
