import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudAutoScalingGroup } from '../../model/autoScaling/NCloudAutoScalingGroup';

export class AutoScalingGroupParser extends BaseResourceParser {
    protected resourceType = ['auto_scaling_group'];

    protected createModel(properties: any): NCloudAutoScalingGroup {
        return new NCloudAutoScalingGroup({
            name: this.getNameOrDefault(properties, 'auto-scaling-group'),
            launchConfigurationName: properties.launch_configuration_name,
            minSize: properties.min_size,
            maxSize: properties.max_size,
            desiredCapacity: properties.desired_capacity,
            ignoreCapacityChanges: properties.ignore_capacity_changes,
            defaultCooldown: properties.default_cooldown,
            healthCheckTypeCode: properties.health_check_type_code,
            waitForCapacityTimeout: properties.wait_for_capacity_timeout,
            healthCheckGracePeriod: properties.health_check_grace_period,
            // Environment-specific properties
            zoneNoList: properties.zone_no_list,
            subnetName: properties.subnet_name,
            accessControlGroupNoList: properties.access_control_group_no_list,
            targetGroupList: properties.target_group_list,
            serverNamePrefix: properties.server_name_prefix,
        });
    }
}
