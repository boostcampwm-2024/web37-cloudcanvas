export interface NetworkInterface {
    id: string;
    subnetNo: string;
    description?: string;
    privateIp?: string;
    serverInstanceNo?: string;
    accessControlGroups: string[];
    instanceType?: string;
}
