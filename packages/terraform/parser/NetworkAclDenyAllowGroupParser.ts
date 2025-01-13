import { BaseResourceParser } from './BaseResourceParser';
import { NCloudNetworkAclDenyAllowGroup } from '../model/vpc/NcloudNetworkAclDenyAllowGroup';


export class NetworkAclDenyAllowGroupParser extends BaseResourceParser {
    protected resourceType = ['network_acl_deny_allow_group'];

    protected createModel(properties: any): NCloudNetworkAclDenyAllowGroup {
        return new NCloudNetworkAclDenyAllowGroup({
            name: this.getNameOrDefault(properties, 'deny-allow-group'),
            vpcName: properties.vpc_name,
            ipList: properties.ip_list,
            description: properties.description,
        });
    }
}

