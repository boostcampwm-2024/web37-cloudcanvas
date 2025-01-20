import { Route } from '../../interface/vpc/Route';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';

export class NCloudRoute implements Route, NCloudModel {
    id: string;
    routeTableNo: string;
    destinationCidrBlock: string;
    targetType: 'NATGW' | 'VPCPEERING' | 'VGW';
    targetNo: string;
    targetName: string;
    isDefault?: boolean;
    vpcNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_route';
        this.priority = ResourcePriority.ROUTE;

        this.id = json.id || `route-${Date.now()}`;
        this.routeTableNo = `ncloud_route_table.${json.routeTableName.toLowerCase()}.id`;
        this.destinationCidrBlock = json.destinationCidrBlock;
        this.targetType = json.targetType;
        this.targetName = json.targetName;

        // targetNo 참조 설정
        switch (this.targetType) {
            case 'NATGW':
                this.targetNo = `ncloud_nat_gateway.${json.targetName.toLowerCase()}.id`;
                break;
            case 'VPCPEERING':
                this.targetNo = `ncloud_vpc_peering.${json.targetName.toLowerCase()}.id`;
                break;
            case 'VGW':
                this.targetNo = `ncloud_virtual_private_gateway.${json.targetName.toLowerCase()}.id`;
                break;
        }

        if (json.isDefault !== undefined) this.isDefault = json.isDefault;
        if (json.vpcNo) this.vpcNo = json.vpcNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            route_table_no: this.routeTableNo,
            destination_cidr_block: this.destinationCidrBlock,
            target_type: this.targetType,
            target_no: this.targetNo,
            target_name: this.targetName,
        };

        return properties;
    }
}
