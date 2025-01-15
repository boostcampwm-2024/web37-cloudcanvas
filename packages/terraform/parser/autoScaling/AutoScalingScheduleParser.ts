import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudAutoScalingSchedule } from '../../model/autoScaling/NCloudAutoScalingSchedule';

export class AutoScalingScheduleParser extends BaseResourceParser {
    protected resourceType = ['auto_scaling_schedule'];

    protected createModel(properties: any): NCloudAutoScalingSchedule {
        return new NCloudAutoScalingSchedule({
            name: this.getNameOrDefault(properties, 'auto-scaling-schedule'),
            desiredCapacity: properties.desired_capacity,
            minSize: properties.min_size,
            maxSize: properties.max_size,
            startTime: properties.start_time,
            endTime: properties.end_time,
            recurrence: properties.recurrence,
            autoScalingGroupName: properties.auto_scaling_group_name,
            timeZone: properties.time_zone,
        });
    }
}
