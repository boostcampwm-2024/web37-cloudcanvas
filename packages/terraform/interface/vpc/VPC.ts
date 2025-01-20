export interface VPC {
    id: string;
    ipv4CidrBlock: string;
    vpcNo?: string;
    defaultNetworkAclNo?: string;
    defaultAccessControlGroupNo?: string;
    defaultPublicRouteTableNo?: string;
    defaultPrivateRouteTableNo?: string;
}
