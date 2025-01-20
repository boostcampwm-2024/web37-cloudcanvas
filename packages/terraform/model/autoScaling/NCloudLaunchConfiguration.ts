import { ResourcePriority } from '../../enum/ResourcePriority';
import { NCloudModel } from '../../interface/NCloudModel';
import { LaunchConfiguration } from '../../interface/autoScaling/LaunchConfiguration';

export class NCloudLaunchConfiguration
    implements LaunchConfiguration, NCloudModel
{
    id: string;
    name?: string;
    serverImageProductCode?: string;
    serverProductCode?: string;
    memberServerImageNo?: string;
    loginKeyName?: string;
    initScriptNo?: string;
    userData?: string;
    accessControlGroupNoList?: string[];
    isEncryptedVolume?: boolean;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_launch_configuration';
        this.priority = ResourcePriority.LAUNCH_CONFIGURATION;

        this.id = json.id || `LaunchConfiguration-${Date.now()}`;

        if (json.name) {
            this.name = json.name.toLowerCase();
        }

        if (json.serverImageProductCode) {
            this.serverImageProductCode = json.serverImageProductCode;
        } else if (json.memberServerImageNo) {
            this.memberServerImageNo = json.memberServerImageNo;
        } else {
            this.serverImageProductCode = 'SW.VSVR.OS.LNX64.CNTOS.0703.B050';
        }

        this.serverProductCode =
            json.serverProductCode ||
            'SVR.VSVR.HICPU.C002.M004.NET.SSD.B050.G002';

        if (json.loginKeyName) this.loginKeyName = json.loginKeyName;
        if (json.initScriptNo) this.initScriptNo = json.initScriptNo;
        if (json.userData) this.userData = json.userData;
        if (json.accessControlGroupNoList) {
            this.accessControlGroupNoList = json.accessControlGroupNoList;
        }
        if (json.isEncryptedVolume !== undefined) {
            this.isEncryptedVolume = json.isEncryptedVolume;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {};

        if (this.name) {
            properties.name = this.name;
        }

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
        if (this.userData) {
            properties.user_data = this.userData;
        }
        if (this.accessControlGroupNoList) {
            properties.access_control_group_no_list =
                this.accessControlGroupNoList;
        }
        if (this.isEncryptedVolume !== undefined) {
            properties.is_encrypted_volume = this.isEncryptedVolume;
        }

        return properties;
    }
}
