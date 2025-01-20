import { RouteTable } from './RouteTable';
import { NCloudModel } from '../NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudRouteTable implements RouteTable, NCloudModel {
    id: string;
    vpcNo: string;
    supportedSubnetType: 'PUBLIC' | 'PRIVATE';
    name?: string;
    description?: string;
    routeTableNo?: string;
    isDefault?: boolean;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_route_table';
        this.priority = ResourcePriority.ROUTE_TABLE;

        this.id = json.id || `route-table-${Date.now()}`;
        this.vpcNo = `ncloud_vpc.${json.vpcName.toLowerCase()}.id`;
        this.supportedSubnetType = json.supportedSubnetType;

        if (json.name) this.name = json.name.toLowerCase();
        if (json.description) this.description = json.description;

        if (json.routeTableNo) this.routeTableNo = json.routeTableNo;
        if (json.isDefault !== undefined) this.isDefault = json.isDefault;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
            supported_subnet_type: this.supportedSubnetType,
        };

        if (this.name) properties.name = this.name;
        if (this.description) properties.description = this.description;

        return properties;
    }
}
