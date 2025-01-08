import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { Subnet } from '../../interface/vpc/Subnet';

export class NCloudSubnet implements Subnet, NCloudModel {
    id: string;
    name?: string;
    vpcNo: string;
    subnet: string;
    zone: string;
    networkAclNo: string;
    subnetType: 'PUBLIC' | 'PRIVATE';
    usageType?: 'GEN' | 'LOADB' | 'BM' | 'NATGW';
    subnetNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_subnet';
        this.priority = ResourcePriority.SUBNET;
        this.id = json.id || `subnet-${Date.now()}`;
        this.subnet = json.subnet;
        this.zone = json.zone;
        this.subnetType = json.subnetType;
        this.name = json.name?.toLowerCase();
        this.usageType = json.usageType || 'GEN';
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.networkAclNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.default_network_acl_no`;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
            subnet: this.subnet,
            zone: this.zone,
            network_acl_no: this.networkAclNo,
            subnet_type: this.subnetType,
        };

        if (this.name) {
            properties.name = this.name;
        }
        if (this.usageType) {
            properties.usage_type = this.usageType;
        }

        return properties;
    }
}
