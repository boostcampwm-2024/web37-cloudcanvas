import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudNatGateway } from '../../model/vpc/NCloudNatGateway';

export class NatGatewayParser extends BaseResourceParser {
    protected resourceType = ['nat_gateway'];

    protected createModel(properties: any): NCloudNatGateway {
        return new NCloudNatGateway({
            name: this.getNameOrDefault(properties, 'nat-gateway'),
            vpcName: properties.vpc_name,
            zone: properties.zone,
            subnetName: properties.subnet_name,
            privateIp: properties.private_ip,
            description: properties.description,
        });
    }
}
