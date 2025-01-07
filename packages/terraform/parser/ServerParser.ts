import { BaseResourceParser } from './BaseResourceParser';
import { ValidationError } from '../util/ValidationError';
import { NCloudServer } from '../model/server/NCloudServer';

export class ServerParser extends BaseResourceParser {
    protected resourceType = ['server'];

    protected createModel(properties: any): NCloudServer {
        return new NCloudServer({
            name: this.getNameOrDefault(properties, 'server'),
            subnetName: properties.subnet,
            serverImageNumber: properties.server_image_number,
            serverSpecCode: properties.server_spec_code,
            serverImageProductCode: properties.server_image_product_code,
            serverProductCode: properties.server_product_code,
            memberServerImageNo: properties.member_server_image_no,
            description: properties.description,
            loginKeyName: properties.login_key_name,
            isProtectServerTermination:
                properties.is_protect_server_termination,
            initScriptNo: properties.init_script_no,
            networkInterface: properties.network_interface,
            isEncryptedBaseBlockStorageVolume:
                properties.is_encrypted_base_block_storage_volume,
        });
    }
}
