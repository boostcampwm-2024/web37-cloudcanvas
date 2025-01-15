import { BaseResourceParser } from './BaseResourceParser';
import { NCloudPlacementGroup } from '../model/server/NCloudPlacementGroup';

export class PlacementGroupParser extends BaseResourceParser {
    protected resourceType = ['placement_group'];

    protected createModel(properties: any): NCloudPlacementGroup {
        return new NCloudPlacementGroup({
            name: this.getNameOrDefault(properties, 'placement-group'),
            placementGroupType: properties.placement_group_type,
        });
    }
}