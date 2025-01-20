import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { AutoScalingPolicy } from '../../interface/autoScaling/AutoScalingPolicy';

export class NCloudAutoScalingPolicy implements AutoScalingPolicy, NCloudModel {
    id: string;
    name: string;
    adjustmentTypeCode: 'CHANG' | 'EXACT' | 'PRCNT';
    scalingAdjustment: number;
    autoScalingGroupNo: string;
    cooldown?: number;
    minAdjustmentStep?: number;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_auto_scaling_policy';
        this.priority = ResourcePriority.AUTO_SCALING_POLICY;

        this.name = json.name.toLowerCase();
        this.adjustmentTypeCode = json.adjustmentTypeCode;
        this.scalingAdjustment = json.scalingAdjustment;
        this.autoScalingGroupNo = `ncloud_auto_scaling_group.${json.autoScalingGroupName.toLowerCase()}.auto_scaling_group_no`;

        this.id = this.name;

        if (json.cooldown !== undefined) this.cooldown = json.cooldown;
        if (json.minAdjustmentStep !== undefined) {
            this.minAdjustmentStep = json.minAdjustmentStep;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            adjustment_type_code: this.adjustmentTypeCode,
            scaling_adjustment: this.scalingAdjustment,
            auto_scaling_group_no: this.autoScalingGroupNo,
        };

        if (this.cooldown !== undefined) properties.cooldown = this.cooldown;
        if (this.minAdjustmentStep !== undefined) {
            properties.min_adjustment_step = this.minAdjustmentStep;
        }

        return properties;
    }
}
