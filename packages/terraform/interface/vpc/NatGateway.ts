export interface NatGateway {
    id: string;
    vpcNo: string;
    zone: string;
    subnetNo?: string;
    name?: string;
    privateIp?: string;
    description?: string;
    natGatewayNo?: string;
    publicIp?: string;
    publicIpNo?: string;
    subnetName?: string;
}
