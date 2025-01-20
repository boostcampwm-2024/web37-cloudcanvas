import { RouteTableAssociation } from './RouteTableAssociation';
import { NCloudModel } from '../NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudRouteTableAssociation
    implements RouteTableAssociation, NCloudModel
{
    id: string;
    routeTableNo: string;
    subnetNo: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_route_table_association';
        this.priority = ResourcePriority.ROUTE_TABLE_ASSOCIATION;

        this.routeTableNo = `ncloud_route_table.${json.routeTableName.toLowerCase()}.id`;
        this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;

        this.id = `${this.routeTableNo}:${this.subnetNo}`;
    }

    getProperties() {
        return {
            route_table_no: this.routeTableNo,
            subnet_no: this.subnetNo,
        };
    }
}
