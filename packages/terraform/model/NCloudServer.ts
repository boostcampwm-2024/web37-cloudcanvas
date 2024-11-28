import { Server } from '../interface/Server';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudServer implements Server, NCloudModel {
    id: string;
    name: string;
    subnetNo: string;
    serverImageNumber: string;
    serverSpecCode: string;
    loginKeyName?: string;
    networkInterfaceNo?: string;
    acgName?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_server';
        this.priority = ResourcePriority.SERVER;
        this.id = json.id;
        this.name = json.name.toLowerCase();
        this.subnetNo = `ncloud_subnet.${json.subnetName.toLowerCase()}.id`;
        this.serverImageNumber = json.serverImageNumber;
        this.serverSpecCode = json.serverSpecCode;
        if (json.loginKeyName) {
            this.loginKeyName = `ncloud_login_key.${json.loginKeyName.toLowerCase()}.key_name`;
        }
        if (json.nicName) {
            this.networkInterfaceNo = `ncloud_network_interface.${json.nicName.toLowerCase()}.id`;
        }
        if (json.acgName) {
            this.acgName = `ncloud_acg.${json.acgName.toLowerCase()}.id`;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            subnet_no: this.subnetNo,
            name: this.name,
            server_image_number: this.serverImageNumber,
            server_spec_code: this.serverSpecCode,
        };

        if (this.loginKeyName) {
            properties.login_key_name = this.loginKeyName;
        }
        if (this.networkInterfaceNo) {
            properties.network_interface = {
                network_interface_no: this.networkInterfaceNo,
                order: 0,
            };
        }
        if (this.acgName) {
            properties.access_control_group = {
                access_control_group_no: this.acgName,
                order: 0,
            };
        }
        return properties;
    }
}
