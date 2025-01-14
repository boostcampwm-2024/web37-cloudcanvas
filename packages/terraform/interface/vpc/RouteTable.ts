export interface RouteTable {
    id: string;
    vpcNo: string;
    supportedSubnetType: 'PUBLIC' | 'PRIVATE';
    name?: string;
    description?: string;
    routeTableNo?: string;
    isDefault?: boolean;
}
