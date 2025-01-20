export interface AutoScalingSchedule {
    id: string;
    name: string;
    desiredCapacity: number;
    minSize: number;
    maxSize: number;
    startTime?: string;
    endTime?: string;
    recurrence?: string;
    autoScalingGroupNo: string;
    timeZone?: 'KST' | 'UTC';
}
