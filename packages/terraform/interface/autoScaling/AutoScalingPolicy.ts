export interface AutoScalingPolicy {
    id: string;
    name: string;
    adjustmentTypeCode: 'CHANG' | 'EXACT' | 'PRCNT';
    scalingAdjustment: number;
    autoScalingGroupNo: string;
    cooldown?: number;
    minAdjustmentStep?: number;
}
