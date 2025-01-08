export interface LoadBalancer {
    id: string;
    networkType: string;
    type: string;
    subnetNoList: string[];
    idleTimeout?: number;
    throughputType?: string;
    description?: string;
}
