import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudLaunchConfiguration } from '../../model/autoScaling/NCloudLaunchConfiguration';

export class LaunchConfigurationParser extends BaseResourceParser {
    protected resourceType = ['launchconfiguration'];

    protected createModel(properties: any): NCloudLaunchConfiguration {
        return new NCloudLaunchConfiguration({
            name: properties.name.toLowerCase(),
            serverImageProductCode: properties.server_image_productCode,
            serverProductCode: properties.server_product_code,
            memberServerImageNo: properties.member_server_image_no,
            loginKeyName: properties.login_key_name,
            initScriptNo: properties.init_script_no,
            isEncryptedVolume: properties.is_encrypted_volume,
        });
    }
}
