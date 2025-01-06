import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudServer } from '../model/NCloudServer';

export class ServerParser extends BaseResourceParser {
    protected resourceType = ['server'];

    protected validateProperties(properties: any): void {
        if (!properties.server_image_number) {
            throw new ValidationError(
                'Server',
                'serverImageNumber',
                'server image number 가 필수입니다.',
            );
        }
        if (!properties.server_spec_code) {
            throw new ValidationError(
                'Server',
                'serverSpecCode',
                'server spec code 가 필수입니다.',
            );
        }
        if (!properties.subnet) {
            throw new ValidationError(
                'Server',
                'subnet',
                'subnet 이 필수입니다.',
            );
        }
    }

    protected createModel(properties: any): NCloudServer {
        return new NCloudServer({
            name: this.getNameOrDefault(properties, 'server'),
            serverImageNumber: properties.server_image_number,
            serverSpecCode: properties.server_spec_code,
            subnetName: properties.subnet,
            loginKeyName: properties.loginKeyName,
            nicName: properties.nicName,
            acgName: properties.acgName,
        });
    }
}
