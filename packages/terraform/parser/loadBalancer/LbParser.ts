import { BaseResourceParser } from '../BaseResourceParser';
import { NCloudLb } from '../../model/loadBalancer/NCloudLb';

export class LbParser extends BaseResourceParser {
    protected resourceType = ['lb'];

    protected createModel(properties: any): NCloudLb {
        return new NCloudLb({
            name: this.getNameOrDefault(properties, 'lb'),
            type: properties.type,
            subnetNoList: properties.subnet_name_list,
            networkType: properties.network_type,
            idleTimeout: properties.idle_timeout,
            throughputType: properties.throughput_type,
            description: properties.description,
        });
    }
}
