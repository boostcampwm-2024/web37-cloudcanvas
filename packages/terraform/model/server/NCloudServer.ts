import { Server } from '../../interface/Server';
import { NCloudModel } from '../../interface/NCloudModel';
import { ResourcePriority } from '../../enum/ResourcePriority';
import { NetworkInterface } from '../../interface/NetworkInterface';

export class NCloudServer implements Server, NCloudModel {
    id: string;
    name?: string;
    subnetNo: string;
    serverImageProductCode?: string;
    serverProductCode?: string;
    memberServerImageNo?: string;
    serverImageNumber?: string;
    serverSpecCode?: string;
    description?: string;
    loginKeyName?: string;
    isProtectServerTermination?: boolean;
    initScriptNo?: string;
    networkInterface?: NetworkInterface[];
    isEncryptedBaseBlockStorageVolume?: boolean;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_server';
        this.priority = ResourcePriority.SERVER;
        this.id = json.id || `server-${Date.now()}`;
        this.name = json.name?.toLowerCase();
        this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;
        this.serverImageNumber = json.serverImageNumber;
        this.serverSpecCode = json.serverSpecCode;
        this.serverImageProductCode = json.serverImageProductCode;
        this.serverProductCode = json.serverProductCode;
        this.memberServerImageNo = json.memberServerImageNo;
        this.description = json.description;
        this.isProtectServerTermination = json.isProtectServerTermination;
        this.initScriptNo = json.initScriptNo;
        this.isEncryptedBaseBlockStorageVolume = json.isEncryptedBaseBlockStorageVolume;

        if (json.loginKeyName) {
            this.loginKeyName = `ncloud_login_key.${json.loginKeyName.toLowerCase()}.key_name`;
        }

        if (json.networkInterface) {
            this.networkInterface = json.networkInterface.map((nic: any) => ({
                networkInterfaceNo: `ncloud_network_interface.${nic.networkInterfaceNo.toLowerCase()}.id`,
                order: nic.order || 0
            }));
        }

    }

    getProperties() {
        const properties: { [key: string]: any } = {
            subnet_no: this.subnetNo,
        };

        if (this.name) {
            properties.name = this.name;
        }
        if (this.serverImageProductCode) {
            properties.server_image_product_code = this.serverImageProductCode;
        }
        if (this.serverProductCode) {
            properties.server_product_code = this.serverProductCode;
        }
        if (this.memberServerImageNo) {
            properties.member_server_image_no = this.memberServerImageNo;
        }
        if (this.serverImageNumber) {
            properties.server_image_number = this.serverImageNumber;
        }
        if (this.serverSpecCode) {
            properties.server_spec_code = this.serverSpecCode;
        }
        if (this.description) {
            properties.description = this.description;
        }
        if (this.loginKeyName) {
            properties.login_key_name = this.loginKeyName;
        }
        if (this.isProtectServerTermination !== undefined) {
            properties.is_protect_server_termination = this.isProtectServerTermination;
        }
        if (this.initScriptNo) {
            properties.init_script_no = this.initScriptNo;
        }
        if (this.networkInterface) {
            properties.network_interface = this.networkInterface;
        }
        if (this.isEncryptedBaseBlockStorageVolume !== undefined) {
            properties.is_encrypted_base_block_storage_volume = this.isEncryptedBaseBlockStorageVolume;
        }

        return properties;
    }

}
