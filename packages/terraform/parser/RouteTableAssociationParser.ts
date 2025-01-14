import { BaseResourceParser } from './BaseResourceParser';
import { NCloudRouteTableAssociation } from '../model/vpc/NCloudRouteTableAssociation';

export class RouteTableAssociationParser extends BaseResourceParser {
    protected resourceType = ['route_table_association'];

    protected createModel(properties: any): NCloudRouteTableAssociation {
        return new NCloudRouteTableAssociation({
            routeTableName: properties.route_table_name,
            subnetName: properties.subnet_name,
        });
    }
}
