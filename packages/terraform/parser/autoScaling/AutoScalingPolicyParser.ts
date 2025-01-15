import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudAutoScalingPolicy } from '../../model/autoScaling/NCloudAutoScalingPolicy';


export class AutoScalingPolicyParser extends BaseResourceParser {
    protected resourceType = ['auto_scaling_policy'];

    protected createModel(properties: any): NCloudAutoScalingPolicy {
        return new NCloudAutoScalingPolicy({
            name: this.getNameOrDefault(properties, 'auto-scaling-policy'),
            adjustmentTypeCode: properties.adjustment_type_code,
            scalingAdjustment: properties.scaling_adjustment,
            autoScalingGroupName: properties.auto_scaling_group_name,
            cooldown: properties.cooldown,
            minAdjustmentStep: properties.min_adjustment_step,
        });
    }
}