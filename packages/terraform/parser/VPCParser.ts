import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudVPC } from '../model/NCloudVPC';

export class VPCParser extends BaseResourceParser {
    protected resourceType = ['vpc'];

    protected validateProperties(properties: any) {
        if (!properties.cidrBlock) {
            throw new ValidationError(
                'VPC',
                'ipv4CidrBlock',
                '필수 속성이 없습니다.',
            );
        }
    }

    protected createModel(properties: any): NCloudVPC {
        return new NCloudVPC({
            name: this.getNameOrDefault(properties, 'vpc'),
            ipv4CidrBlock: properties.cidrBlock,
        });
    }
}
