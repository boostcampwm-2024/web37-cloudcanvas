import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudSubnet } from '../../model/vpc/NCloudSubnet';

export class SubnetParser extends BaseResourceParser {
    protected resourceType = ['subnet'];

    protected createModel(properties: any): NCloudSubnet {
        return new NCloudSubnet({
            name: this.getNameOrDefault(properties, 'subnet'),
            subnet: properties.subnet,
            zone: properties.zone,
            subnetType: properties.subnetType,
            usageType: properties.usageType || 'GEN',
            vpcName: properties.vpcName,
            networkAclNo: properties.networkAclNo,
        });
    }
}
