export interface Subnet {
    id: string;
    vpcNo: string;
    subnet: string;
    zone: string;
    networkAclNo: string;
    subnetType: 'PUBLIC' | 'PRIVATE';
    usageType?: 'GEN' | 'LOADB' | 'BM' | 'NATGW';
    subnetNo?: string;
}
