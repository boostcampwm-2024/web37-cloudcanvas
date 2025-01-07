import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudLaunchConfiguration } from '../model/NCloudLaunchConfiguration';

export class LaunchConfigurationParser extends BaseResourceParser {
    protected resourceType = ['launchconfiguration'];

    protected validateProperties(properties: any): void {
        if (!properties.name) {
            throw new ValidationError('LaunchConfiguration', 'name', 'name이 필수입니다');
        }
    }

    protected createModel(properties: any): NCloudLaunchConfiguration {
        return new NCloudLaunchConfiguration({
            name: properties.name.toLowerCase(),
            serverImageProductCode: properties.serverImageProductCode,
            serverProductCode: properties.serverProductCode,
            memberServerImageNo: properties.memberServerImageNo,
            loginKeyName: properties.loginKeyName,
            initScriptNo: properties.initScriptNo,
            isEncryptedVolume: properties.isEncryptedVolume
        });
    }
}