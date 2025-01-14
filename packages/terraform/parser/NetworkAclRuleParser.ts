import { BaseResourceParser } from './BaseResourceParser';
import { NCloudNetworkAclRule } from '../model/vpc/NCloudNetworkAclRule';

export class NetworkAclRuleParser extends BaseResourceParser {
    protected resourceType = ['network_acl_rule'];

    protected createModel(properties: any): NCloudNetworkAclRule {
        return new NCloudNetworkAclRule({
            networkAclName: properties.network_acl_name,
            inbound: properties.inbound,
            outbound: properties.outbound,
        });
    }
}
