import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudSubnet } from '../model/NCloudSubnet';

export class SubnetParser extends BaseResourceParser {
    protected resourceType = ['subnet'];

    protected validateProperties(properties: any): void {
        if (!properties.subnet) {
            throw new ValidationError('Subnet', 'subnet', 'CIDR block 이 필수 속성입니다.');
        }
        if (!properties.zone) {
            throw new ValidationError('Subnet', 'zone', 'zone 이 필수 속성입니다.');
        }
        if (!properties.subnetType || !['PUBLIC', 'PRIVATE'].includes(properties.subnetType)) {
            throw new ValidationError('Subnet', 'subnetType', 'PUBLIC 또는 PRIVATE 이어야 합니다');
        }
        if (properties.usageType && !['GEN', 'LOADB', 'BM', 'NATGW'].includes(properties.usageType)) {
            throw new ValidationError('Subnet', 'usageType', 'GEN, LOADB, BM, NATGW 중 하나여야 합니다');
        }
    }

    protected createModel(properties: any): NCloudSubnet {
        return new NCloudSubnet({
            name: this.getNameOrDefault(properties, 'subnet'),
            subnet: properties.subnet,
            zone: properties.zone,
            subnetType: properties.subnetType,
            usageType: properties.usageType || 'GEN',
            vpcName: properties.vpcName,
            networkAclNo: properties.networkAclNo
        });
    }
}
