export interface VPC {
    id: string;
    name?: string;
    ipv4CidrBlock: string;
    defaultNetworkAclNo?: string;
    defaultAccessControlGroupNo?: string;
    defaultPublicRouteTableNo?: string;
    defaultPrivateRouteTableNo?: string;
}
