import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { AutoScalingSchedule } from '../../interface/autoScaling/AutoScalingSchedule';

export class NCloudAutoScalingSchedule
    implements AutoScalingSchedule, NCloudModel
{
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
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_auto_scaling_schedule';
        this.priority = ResourcePriority.AUTO_SCALING_SCHEDULE;

        this.name = json.name;
        this.desiredCapacity = json.desiredCapacity;
        this.minSize = json.minSize;
        this.maxSize = json.maxSize;
        this.autoScalingGroupNo = `ncloud_auto_scaling_group.${json.autoScalingGroupName.toLowerCase()}.auto_scaling_group_no`;

        this.id = this.name;

        // Optional fields
        if (json.startTime) this.startTime = json.startTime;
        if (json.endTime) this.endTime = json.endTime;
        if (json.recurrence) this.recurrence = json.recurrence;
        if (json.timeZone) this.timeZone = json.timeZone;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
            desired_capacity: this.desiredCapacity,
            min_size: this.minSize,
            max_size: this.maxSize,
            auto_scaling_group_no: this.autoScalingGroupNo,
        };

        if (this.startTime) properties.start_time = this.startTime;
        if (this.endTime) properties.end_time = this.endTime;
        if (this.recurrence) properties.recurrence = this.recurrence;
        if (this.timeZone) properties.time_zone = this.timeZone;

        return properties;
    }
}
