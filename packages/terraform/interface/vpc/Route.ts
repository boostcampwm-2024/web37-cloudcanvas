export interface Route {
    id: string;
    routeTableNo: string;
    destinationCidrBlock: string;
    targetType: 'NATGW' | 'VPCPEERING' | 'VGW';
    targetNo: string;
    targetName: string;
    isDefault?: boolean;
    vpcNo?: string;
}
