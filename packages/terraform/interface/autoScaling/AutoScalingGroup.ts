export interface AutoScalingGroup {
    id: string;
    name?: string;
    launchConfigurationNo: string;
    desiredCapacity?: number;
    minSize: number;
    maxSize: number;
    ignoreCapacityChanges?: boolean;
    defaultCooldown?: number;
    healthCheckTypeCode?: 'SVR' | 'LOADB';
    waitForCapacityTimeout?: string;
    healthCheckGracePeriod?: number;
    zoneNoList?: string[];
    subnetNo?: string;
    accessControlGroupNoList?: string[];
    targetGroupList?: string[];
    serverNamePrefix?: string;
    autoScalingGroupNo?: string;
    serverInstanceNoList?: string[];
    vpcNo?: string;
}