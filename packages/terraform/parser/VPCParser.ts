import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudVPC } from '../model/vpc/NCloudVPC';

export class VPCParser extends BaseResourceParser {
    protected resourceType = ['vpc'];

    protected createModel(properties: any): NCloudVPC {
        return new NCloudVPC({
            name: this.getNameOrDefault(properties, 'vpc'),
            ipv4CidrBlock: properties.cidrBlock,
        });
    }
}
