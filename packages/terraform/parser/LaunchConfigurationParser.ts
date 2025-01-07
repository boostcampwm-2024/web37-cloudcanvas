import { BaseResourceParser } from './BaseResourceParser';
import { NCloudLaunchConfiguration } from '../model/autoScaling/NCloudLaunchConfiguration';

export class LaunchConfigurationParser extends BaseResourceParser {
    protected resourceType = ['launchconfiguration'];

    protected createModel(properties: any): NCloudLaunchConfiguration {
        return new NCloudLaunchConfiguration({
            name: properties.name.toLowerCase(),
            serverImageProductCode: properties.serverImageProductCode,
            serverProductCode: properties.serverProductCode,
            memberServerImageNo: properties.memberServerImageNo,
            loginKeyName: properties.loginKeyName,
            initScriptNo: properties.initScriptNo,
            isEncryptedVolume: properties.isEncryptedVolume,
        });
    }
}
