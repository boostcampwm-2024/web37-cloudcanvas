import { VPC } from '../interface/VPC';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudVPC implements VPC, NCloudModel {
    id: string;
    name?: string;
    ipv4CidrBlock: string;
    defaultNetworkAclNo?: string;
    defaultAccessControlGroupNo?: string;
    defaultPublicRouteTableNo?: string;
    defaultPrivateRouteTableNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_vpc';
        this.priority = ResourcePriority.VPC;
        this.id = json.id;
        if (json.name) {
            this.name = json.name.toLowerCase();
        }
        if (!json.ipv4CidrBlock) {
            throw new Error('ipv4CidrBlock is required for VPC');
        }
        this.ipv4CidrBlock = json.ipv4CidrBlock;
        this.defaultNetworkAclNo = json.defaultNetworkAclNo;
        this.defaultAccessControlGroupNo = json.defaultAccessControlGroupNo;
        this.defaultPublicRouteTableNo = json.defaultPublicRouteTableNo;
        this.defaultPrivateRouteTableNo = json.defaultPrivateRouteTableNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            ipv4_cidr_block: this.ipv4CidrBlock,
        };

        if (this.name) {
            properties.name = this.name;
        }

        return properties;
    }
}
