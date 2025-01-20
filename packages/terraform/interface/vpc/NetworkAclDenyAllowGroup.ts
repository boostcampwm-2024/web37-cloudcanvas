export interface NetworkAclDenyAllowGroup {
    id: string;
    vpcNo: string;
    ipList: string[];
    name?: string;
    description?: string;
    networkAclDenyAllowGroupNo?: string;
}
