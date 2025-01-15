import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { PlacementGroup } from '../../interface/server/PlacementGroup';

export class NCloudPlacementGroup implements PlacementGroup, NCloudModel {
    id: string;
    name?: string;
    placementGroupType?: 'AA';
    placementGroupNo?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_placement_group';
        this.priority = ResourcePriority.PLACEMENT_GROUP;

        this.id = json.id || `placement-group-${Date.now()}`;

        if (json.name) this.name = json.name.toLowerCase();
        if (json.placementGroupType) this.placementGroupType = json.placementGroupType;

        if (json.placementGroupNo) this.placementGroupNo = json.placementGroupNo;
    }

    getProperties() {
        const properties: { [key: string]: any } = {};

        if (this.name) properties.name = this.name;
        if (this.placementGroupType) {
            properties.placement_group_type = this.placementGroupType;
        }

        return properties;
    }
}