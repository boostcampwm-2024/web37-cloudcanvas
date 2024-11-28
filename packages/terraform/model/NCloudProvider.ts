import { Provider } from '../interface/Provider';

export class NCloudProvider implements Provider {
    accessKey: string;
    secretKey: string;
    region: string;
    site: string;
    name: string;
    serviceType: string;
    requiredVersion: string;
    source: string;
    alias?: string;

    constructor(json: any) {
        this.serviceType = 'provider';
        this.name = 'ncloud';
        this.accessKey = json.accessKey || 'var.access_key';
        this.secretKey = json.secretKey || 'var.secret_key';
        this.region = json.region.toUpperCase();
        this.site = json.site || 'public';
        this.requiredVersion = '>= 0.13';
        this.source = 'NaverCloudPlatform/ncloud';
        this.alias = json.alias;
    }

    getProperties(): { [key: string]: any } {
        const providerConfig = {
            access_key: this.accessKey,
            secret_key: this.secretKey,
            region: this.region,
            site: this.site,
            support_vpc: true,
        };

        if (this.alias) {
            return {
                ...providerConfig,
                alias: this.alias,
            };
        }

        return providerConfig;
    }
}
