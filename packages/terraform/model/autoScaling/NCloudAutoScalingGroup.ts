import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { AutoScalingGroup } from '../../interface/autoScaling/AutoScalingGroup';

export class NCloudAutoScalingGroup implements AutoScalingGroup, NCloudModel {
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
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_auto_scaling_group';
        this.priority = ResourcePriority.AUTO_SCALING_GROUP;

        this.id = json.id || `auto-scaling-group-${Date.now()}`;

        this.launchConfigurationNo = `ncloud_launch_configuration.${json.launchConfigurationName.toLowerCase()}.launch_configuration_no`;
        this.minSize = json.minSize;
        this.maxSize = json.maxSize;

        if (json.name) this.name = json.name;
        if (json.desiredCapacity !== undefined)
            this.desiredCapacity = json.desiredCapacity;
        if (json.ignoreCapacityChanges !== undefined) {
            this.ignoreCapacityChanges = json.ignoreCapacityChanges;
        }
        if (json.defaultCooldown !== undefined)
            this.defaultCooldown = json.defaultCooldown;
        if (json.healthCheckTypeCode)
            this.healthCheckTypeCode = json.healthCheckTypeCode;
        if (json.waitForCapacityTimeout)
            this.waitForCapacityTimeout = json.waitForCapacityTimeout;
        if (json.healthCheckGracePeriod !== undefined) {
            this.healthCheckGracePeriod = json.healthCheckGracePeriod;
        }

        if (json.zoneNoList) this.zoneNoList = json.zoneNoList;
        if (json.subnetName) {
            this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;
        }
        if (json.accessControlGroupNoList) {
            this.accessControlGroupNoList = json.accessControlGroupNoList;
        }
        if (json.targetGroupList) this.targetGroupList = json.targetGroupList;
        if (json.serverNamePrefix)
            this.serverNamePrefix = json.serverNamePrefix;

        if (json.autoScalingGroupNo)
            this.autoScalingGroupNo = json.autoScalingGroupNo;
        if (json.serverInstanceNoList)
            this.serverInstanceNoList = json.serverInstanceNoList;
        if (json.vpcNo) this.vpcNo = json.vpcNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            launch_configuration_no: this.launchConfigurationNo,
            min_size: this.minSize,
            max_size: this.maxSize,
        };

        if (this.name) properties.name = this.name;
        if (this.desiredCapacity !== undefined) {
            properties.desired_capacity = this.desiredCapacity;
        }
        if (this.ignoreCapacityChanges !== undefined) {
            properties.ignore_capacity_changes = this.ignoreCapacityChanges;
        }
        if (this.defaultCooldown !== undefined) {
            properties.default_cooldown = this.defaultCooldown;
        }
        if (this.healthCheckTypeCode) {
            properties.health_check_type_code = this.healthCheckTypeCode;
        }
        if (this.waitForCapacityTimeout) {
            properties.wait_for_capacity_timeout = this.waitForCapacityTimeout;
        }
        if (this.healthCheckGracePeriod !== undefined) {
            properties.health_check_grace_period = this.healthCheckGracePeriod;
        }

        if (this.zoneNoList) properties.zone_no_list = this.zoneNoList;
        if (this.subnetNo) properties.subnet_no = this.subnetNo;
        if (this.accessControlGroupNoList) {
            properties.access_control_group_no_list =
                this.accessControlGroupNoList;
        }
        if (this.targetGroupList)
            properties.target_group_list = this.targetGroupList;
        if (this.serverNamePrefix)
            properties.server_name_prefix = this.serverNamePrefix;

        return properties;
    }
}
