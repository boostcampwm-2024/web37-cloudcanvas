import { BaseResourceParser } from './BaseResourceParser';
import { NCloudRouteTable } from '../model/vpc/NCloudRouteTable';

export class RouteTableParser extends BaseResourceParser {
    protected resourceType = ['route_table'];

    protected createModel(properties: any): NCloudRouteTable {
        return new NCloudRouteTable({
            name: this.getNameOrDefault(properties, 'route-table'),
            vpcName: properties.vpc_name,
            supportedSubnetType: properties.supported_subnet_type,
            description: properties.description,
        });
    }
}
