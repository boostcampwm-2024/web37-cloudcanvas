import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { SesCluster } from '../../interface/searchEngineService/SesCluster';

export class NCloudSesCluster implements SesCluster, NCloudModel {
    id: string;
    clusterName: string;
    osImageCode: string;
    vpcNo: string;
    searchEngine: {
        versionCode: string;
        userName: string;
        userPassword: string;
        dashboardPort: string;
    };
    managerNode: {
        isDualManager?: boolean;
        productCode: string;
        subnetNo: string;
        acgId?: string;
        acgName?: string;
    };
    dataNode: {
        productCode: string;
        subnetNo: string;
        count: number;
        storageSize: number;
        acgId?: string;
        acgName?: string;
    };
    masterNode?: {
        productCode: string;
        subnetNo: string;
        count: number;
        acgId?: string;
        acgName?: string;
    };
    loginKeyName: string;
    serviceGroupInstanceNo?: string;
    managerNodeInstanceNoList?: string[];
    clusterNodeList?: {
        computeInstanceName: string;
        computeInstanceNo: string;
        nodeType: string;
        privateIp: string;
        serverStatus: string;
        subnet: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_ses_cluster';
        this.priority = ResourcePriority.SES_CLUSTER;

        // Required fields
        this.clusterName = json.clusterName;
        this.osImageCode = json.osImageCode;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.loginKeyName = `ncloud_login_key.${json.loginKeyName.toLowerCase()}.key_name`;

        this.searchEngine = {
            versionCode: json.searchEngine.versionCode,
            userName: json.searchEngine.userName,
            userPassword: json.searchEngine.userPassword,
            dashboardPort: json.searchEngine.dashboardPort,
        };

        this.managerNode = {
            productCode: json.managerNode.productCode,
            subnetNo: `ncloud_subnet.${json.managerNode.subnetName.toLowerCase()}.id`,
        };
        if (json.managerNode.isDualManager !== undefined) {
            this.managerNode.isDualManager = json.managerNode.isDualManager;
        }

        this.dataNode = {
            productCode: json.dataNode.productCode,
            subnetNo: `ncloud_subnet.${json.dataNode.subnetName.toLowerCase()}.id`,
            count: json.dataNode.count,
            storageSize: json.dataNode.storageSize,
        };

        if (json.masterNode) {
            this.masterNode = {
                productCode: json.masterNode.productCode,
                subnetNo: `ncloud_subnet.${json.masterNode.subnetName.toLowerCase()}.id`,
                count: json.masterNode.count,
            };
        }

        this.id = json.id || `ses-cluster-${Date.now()}`;

        if (json.serviceGroupInstanceNo) {
            this.serviceGroupInstanceNo = json.serviceGroupInstanceNo;
        }
        if (json.managerNodeInstanceNoList) {
            this.managerNodeInstanceNoList = json.managerNodeInstanceNoList;
        }
        if (json.clusterNodeList) {
            this.clusterNodeList = json.clusterNodeList;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            cluster_name: this.clusterName,
            os_image_code: this.osImageCode,
            vpc_no: this.vpcNo,
            search_engine: {
                version_code: this.searchEngine.versionCode,
                user_name: this.searchEngine.userName,
                user_password: this.searchEngine.userPassword,
                dashboard_port: this.searchEngine.dashboardPort,
            },
            manager_node: {
                product_code: this.managerNode.productCode,
                subnet_no: this.managerNode.subnetNo,
            },
            data_node: {
                product_code: this.dataNode.productCode,
                subnet_no: this.dataNode.subnetNo,
                count: this.dataNode.count,
                storage_size: this.dataNode.storageSize,
            },
            login_key_name: this.loginKeyName,
        };

        if (this.managerNode.isDualManager !== undefined) {
            properties.manager_node.is_dual_manager =
                this.managerNode.isDualManager;
        }

        if (this.masterNode) {
            properties.master_node = {
                product_code: this.masterNode.productCode,
                subnet_no: this.masterNode.subnetNo,
                count: this.masterNode.count,
            };
        }

        return properties;
    }
}
