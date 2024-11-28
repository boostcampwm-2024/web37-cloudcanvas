export interface VPC {
    id: string;
    ipv4CidrBlock: string;
    defaultNetworkAclNo?: string;
    defaultAccessControlGroupNo?: string;
    defaultPublicRouteTableNo?: string;
    defaultPrivateRouteTableNo?: string;
}
