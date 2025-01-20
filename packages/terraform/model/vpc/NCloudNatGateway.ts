import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { NatGateway } from '../../interface/vpc/NatGateway';

export class NCloudNatGateway implements NatGateway, NCloudModel {
    id: string;
    vpcNo: string;
    zone: string;
    subnetNo?: string;
    name?: string;
    privateIp?: string;
    description?: string;
    natGatewayNo?: string;
    publicIp?: string;
    publicIpNo?: string;
    subnetName?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_nat_gateway';
        this.priority = ResourcePriority.NAT_GATEWAY;

        this.id = json.id || `nat-gateway-${Date.now()}`;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.zone = json.zone;

        if (json.subnetName) {
            this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;
        }

        if (json.name) this.name = json.name.toLowerCase();
        if (json.privateIp) this.privateIp = json.privateIp;
        if (json.description) this.description = json.description;

        if (json.natGatewayNo) this.natGatewayNo = json.natGatewayNo;
        if (json.publicIp) this.publicIp = json.publicIp;
        if (json.publicIpNo) this.publicIpNo = json.publicIpNo;
        if (json.subnetName) this.subnetName = json.subnetName;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
            zone: this.zone,
        };

        if (this.subnetNo) properties.subnet_no = this.subnetNo;
        if (this.name) properties.name = this.name;
        if (this.privateIp) properties.private_ip = this.privateIp;
        if (this.description) properties.description = this.description;

        return properties;
    }
}
