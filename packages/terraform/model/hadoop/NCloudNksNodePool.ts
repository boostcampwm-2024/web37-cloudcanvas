import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { NksNodePool } from '../../interface/kubernetesService/NksNodePool';

export class NCloudNksNodePool implements NksNodePool, NCloudModel {
    id: string;
    nodePoolName: string;
    clusterUuid: string;
    nodeCount?: number;
    productCode?: string;
    serverSpecCode?: string;
    storageSize?: number;
    softwareCode?: string;
    serverRoleId?: string;
    autoscale?: {
        enabled: boolean;
        min: number;
        max: number;
    };
    subnetNoList?: string[];
    k8sVersion?: string;
    label?: {
        key: string;
        value: string;
    }[];
    taint?: {
        key: string;
        value: string;
        effect: string;
    }[];
    instanceNo?: string;
    nodes?: {
        name: string;
        instanceNo: string;
        spec: string;
        privateIp: string;
        publicIp: string;
        nodeStatus: string;
        containerVersion: string;
        kernelVersion: string;
    }[];
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_nks_node_pool';
        this.priority = ResourcePriority.NKS_NODE_POOL;

        this.nodePoolName = json.nodePoolName;
        this.clusterUuid = `ncloud_nks_cluster.${json.clusterName.toLowerCase()}.uuid`;

        this.id = json.id || `${this.clusterUuid}:${this.nodePoolName}`;

        if (json.nodeCount !== undefined) this.nodeCount = json.nodeCount;
        if (json.productCode) this.productCode = json.productCode;
        if (json.serverSpecCode) this.serverSpecCode = json.serverSpecCode;
        if (json.storageSize) this.storageSize = json.storageSize;
        if (json.softwareCode) this.softwareCode = json.softwareCode;
        if (json.serverRoleId) this.serverRoleId = json.serverRoleId;

        if (json.autoscale) {
            this.autoscale = {
                enabled: json.autoscale.enabled,
                min: json.autoscale.min,
                max: json.autoscale.max,
            };
        }

        if (json.subnetNoList) {
            this.subnetNoList = json.subnetNoList.map(
                (name: string) => `ncloud_subnet.${name.toLowerCase()}.id`,
            );
        }

        if (json.k8sVersion) this.k8sVersion = json.k8sVersion;
        if (json.label) this.label = json.label;
        if (json.taint) this.taint = json.taint;

        if (json.instanceNo) this.instanceNo = json.instanceNo;
        if (json.nodes) this.nodes = json.nodes;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            node_pool_name: this.nodePoolName,
            cluster_uuid: this.clusterUuid,
        };

        if (this.nodeCount !== undefined)
            properties.node_count = this.nodeCount;
        if (this.productCode) properties.product_code = this.productCode;
        if (this.serverSpecCode)
            properties.server_spec_code = this.serverSpecCode;
        if (this.storageSize) properties.storage_size = this.storageSize;
        if (this.softwareCode) properties.software_code = this.softwareCode;
        if (this.serverRoleId) properties.server_role_id = this.serverRoleId;

        if (this.autoscale) {
            properties.autoscale = this.autoscale;
        }

        if (this.subnetNoList) {
            properties.subnet_no_list = this.subnetNoList;
        }

        if (this.k8sVersion) properties.k8s_version = this.k8sVersion;
        if (this.label) properties.label = this.label;
        if (this.taint) properties.taint = this.taint;

        return properties;
    }
}
