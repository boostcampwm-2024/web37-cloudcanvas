import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { Hadoop } from '../../interface/hadoop/Hadoop';

export class NCloudHadoop implements Hadoop, NCloudModel {
    id: string;
    vpcNo: string;
    clusterName: string;
    clusterTypeCode: 'CORE_HADOOP_WITH_SPARK';
    adminUserName: string;
    adminUserPassword: string;
    loginKeyName: string;
    edgeNodeSubnetNo: string;
    masterNodeSubnetNo: string;
    workerNodeSubnetNo: string;
    bucketName: string;
    masterNodeDataStorageType: 'SSD' | 'HDD';
    workerNodeDataStorageType: 'SSD' | 'HDD';
    masterNodeDataStorageSize: number;
    workerNodeDataStorageSize: number;
    imageProductCode?: string;
    engineVersionCode?: string;
    edgeNodeProductCode?: string;
    masterNodeProductCode?: string;
    workerNodeProductCode?: string;
    addOnCodeList?: (
        | 'PRESTO'
        | 'HBASE'
        | 'IMPALA'
        | 'KUDU'
        | 'TRINO'
        | 'NIFI'
    )[];
    workerNodeCount?: number;
    useKdc?: boolean;
    kdcRealm?: string;
    kdcPassword?: string;
    useBootstrapScript?: boolean;
    bootstrapScript?: string;
    useDataCatalog?: boolean;
    // Read-only attributes
    regionCode?: string;
    ambariServerHost?: string;
    clusterDirectAccessAccount?: string;
    isHa?: boolean;
    domain?: string;
    accessControlGroupNoList?: string[];
    hadoopServerList?: {
        serverInstanceNo: string;
        serverName: string;
        serverRole: string;
        zoneCode: string;
        subnetNo: string;
        productCode: string;
        isPublicSubnet: boolean;
        cpuCount: number;
        memorySize: number;
        dataStorageType: string;
        dataStorageSize: number;
        uptime: string;
        createDate: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_hadoop';
        this.priority = ResourcePriority.HADOOP;

        // Required fields
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.clusterName = json.clusterName;
        this.clusterTypeCode = 'CORE_HADOOP_WITH_SPARK';
        this.adminUserName = json.adminUserName;
        this.adminUserPassword = json.adminUserPassword;
        this.loginKeyName = `ncloud_login_key.${json.loginKeyName.toLowerCase()}.key_name`;
        this.edgeNodeSubnetNo = `ncloud_subnet.${json.edgeNodeSubnetName.toLowerCase()}.id`;
        this.masterNodeSubnetNo = `ncloud_subnet.${json.masterNodeSubnetName.toLowerCase()}.id`;
        this.workerNodeSubnetNo = `ncloud_subnet.${json.workerNodeSubnetName.toLowerCase()}.id`;
        this.bucketName = json.bucketName;
        this.masterNodeDataStorageType = json.masterNodeDataStorageType;
        this.workerNodeDataStorageType = json.workerNodeDataStorageType;
        this.masterNodeDataStorageSize = json.masterNodeDataStorageSize;
        this.workerNodeDataStorageSize = json.workerNodeDataStorageSize;

        this.id = json.id || `hadoop-${Date.now()}`;

        if (json.imageProductCode)
            this.imageProductCode = json.imageProductCode;
        if (json.engineVersionCode)
            this.engineVersionCode = json.engineVersionCode;
        if (json.edgeNodeProductCode)
            this.edgeNodeProductCode = json.edgeNodeProductCode;
        if (json.masterNodeProductCode)
            this.masterNodeProductCode = json.masterNodeProductCode;
        if (json.workerNodeProductCode)
            this.workerNodeProductCode = json.workerNodeProductCode;
        if (json.addOnCodeList) this.addOnCodeList = json.addOnCodeList;
        if (json.workerNodeCount) this.workerNodeCount = json.workerNodeCount;
        if (json.useKdc !== undefined) this.useKdc = json.useKdc;
        if (json.kdcRealm) this.kdcRealm = json.kdcRealm;
        if (json.kdcPassword) this.kdcPassword = json.kdcPassword;
        if (json.useBootstrapScript !== undefined)
            this.useBootstrapScript = json.useBootstrapScript;
        if (json.bootstrapScript) this.bootstrapScript = json.bootstrapScript;
        if (json.useDataCatalog !== undefined)
            this.useDataCatalog = json.useDataCatalog;

        if (json.regionCode) this.regionCode = json.regionCode;
        if (json.ambariServerHost)
            this.ambariServerHost = json.ambariServerHost;
        if (json.clusterDirectAccessAccount)
            this.clusterDirectAccessAccount = json.clusterDirectAccessAccount;
        if (json.isHa !== undefined) this.isHa = json.isHa;
        if (json.domain) this.domain = json.domain;
        if (json.accessControlGroupNoList)
            this.accessControlGroupNoList = json.accessControlGroupNoList;
        if (json.hadoopServerList)
            this.hadoopServerList = json.hadoopServerList;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
            cluster_name: this.clusterName,
            cluster_type_code: this.clusterTypeCode,
            admin_user_name: this.adminUserName,
            admin_user_password: this.adminUserPassword,
            login_key_name: this.loginKeyName,
            edge_node_subnet_no: this.edgeNodeSubnetNo,
            master_node_subnet_no: this.masterNodeSubnetNo,
            worker_node_subnet_no: this.workerNodeSubnetNo,
            bucket_name: this.bucketName,
            master_node_data_storage_type: this.masterNodeDataStorageType,
            worker_node_data_storage_type: this.workerNodeDataStorageType,
            master_node_data_storage_size: this.masterNodeDataStorageSize,
            worker_node_data_storage_size: this.workerNodeDataStorageSize,
        };

        if (this.imageProductCode) {
            properties.image_product_code = this.imageProductCode;
        }
        if (this.engineVersionCode) {
            properties.engine_version_code = this.engineVersionCode;
        }
        if (this.edgeNodeProductCode) {
            properties.edge_node_product_code = this.edgeNodeProductCode;
        }
        if (this.masterNodeProductCode) {
            properties.master_node_product_code = this.masterNodeProductCode;
        }
        if (this.workerNodeProductCode) {
            properties.worker_node_product_code = this.workerNodeProductCode;
        }
        if (this.addOnCodeList) {
            properties.add_on_code_list = this.addOnCodeList;
        }
        if (this.workerNodeCount) {
            properties.worker_node_count = this.workerNodeCount;
        }
        if (this.useKdc !== undefined) {
            properties.use_kdc = this.useKdc;
        }
        if (this.kdcRealm) {
            properties.kdc_realm = this.kdcRealm;
        }
        if (this.kdcPassword) {
            properties.kdc_password = this.kdcPassword;
        }
        if (this.useBootstrapScript !== undefined) {
            properties.use_bootstrap_script = this.useBootstrapScript;
        }
        if (this.bootstrapScript) {
            properties.bootstrap_script = this.bootstrapScript;
        }
        if (this.useDataCatalog !== undefined) {
            properties.use_data_catalog = this.useDataCatalog;
        }

        return properties;
    }
}
