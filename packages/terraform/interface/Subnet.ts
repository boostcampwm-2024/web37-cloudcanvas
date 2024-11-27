export interface Subnet {
    id: string;
    vpcNo: string;
    subnet: string;
    zone: string;
    networkAclNo: string;
    subnetType: 'PUBLIC' | 'PRIVATE';
    name?: string;
    usageType?: 'GEN' | 'LOADB' | 'BM' | 'NATGW';
}
