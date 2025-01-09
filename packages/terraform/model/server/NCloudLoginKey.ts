import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { LoginKey } from '../../interface/server/LoginKey';

export class NCloudLoginKey implements LoginKey, NCloudModel {
    keyName: string;
    privateKey?: string;
    fingerprint?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_login_key';
        this.priority = ResourcePriority.LOGIN_KEY;

        this.keyName = json.keyName.toLowerCase();
        if (json.privateKey) this.privateKey = json.privateKey;
        if (json.fingerprint) this.fingerprint = json.fingerprint;
    }

    getProperties() {
        return {
            key_name: this.keyName,
        };
    }
}
