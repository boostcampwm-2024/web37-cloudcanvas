import { BaseResourceParser } from './BaseResourceParser';
import { NCloudRoute } from '../model/vpc/NCloudRoute';

export class RouteParser extends BaseResourceParser {
    protected resourceType = ['route'];

    protected createModel(properties: any): NCloudRoute {
        return new NCloudRoute({
            routeTableName: properties.route_table_name,
            destinationCidrBlock: properties.destination_cidr_block,
            targetType: properties.target_type,
            targetName: properties.target_name,
        });
    }
}
