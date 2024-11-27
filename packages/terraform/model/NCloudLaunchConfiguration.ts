import { ResourcePriority } from '../enum/ResourcePriority';
import { LaunchConfiguration } from '../interface/LaunchConfiguration';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudLaunchConfiguration
    implements LaunchConfiguration, NCloudModel
{
    id: string;
    name: string;
    serverImageProductCode?: string;
    serverProductCode?: string;
    memberServerImageNo?: string;
    loginKeyName?: string;
    initScriptNo?: string;
    isEncryptedVolume?: boolean;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_launch_configuration';
        this.priority = ResourcePriority.LAUNCH_CONFIGURATION;
        this.id = json.id || `LaunchConfiguration-${Date.now()}`;
        this.name = json.name || 'launch-config';
        this.serverImageProductCode =
            json.serverImageProductCode || 'SW.VSVR.OS.LNX64.CNTOS.0703.B050';
        this.serverProductCode =
            json.serverProductCode ||
            'SVR.VSVR.HICPU.C002.M004.NET.SSD.B050.G002';
        this.loginKeyName = json.loginKeyName;
        this.memberServerImageNo = json.memberServerImageNo;
        this.initScriptNo = json.initScriptNo;
        this.isEncryptedVolume = json.isEncryptedVolume;
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            name: this.name,
        };

        if (this.serverImageProductCode) {
            properties.server_image_product_code = this.serverImageProductCode;
        } else if (this.memberServerImageNo) {
            properties.member_server_image_no = this.memberServerImageNo;
        }

        if (this.serverProductCode) {
            properties.server_product_code = this.serverProductCode;
        }
        if (this.loginKeyName) {
            properties.login_key_name = 'LOGIN_KEY_NAME_PLACEHOLDER';
        }
        if (this.initScriptNo) {
            properties.init_script_no = this.initScriptNo;
        }
        if (this.isEncryptedVolume !== undefined) {
            properties.is_encrypted_volume = this.isEncryptedVolume;
        }

        return properties;
    }
}
