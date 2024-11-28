import { NCloudModel } from '../interface/NCloudModel';
import { NCloudVPC } from '../model/NCloudVPC';
import { NCloudNetworkACL } from '../model/NCloudNetworkACL';
import { NCloudSubnet } from '../model/NCloudSubnet';
import { NCloudACG } from '../model/NCloudACG';
import { NCloudACGRule } from '../model/NCloudACGRule';
import { NCloudLoginKey } from '../model/NCloudLoginKey';
import { NCloudNetworkInterface } from '../model/NCloudNetworkInterface';
import { NCloudServer } from '../model/NCloudServer';
import { NCloudPublicIP } from '../model/NCloudPublicIP';
import { NCloudLoadBalancer } from '../model/NCloudLoadBalancer';
import { NCloudLaunchConfiguration } from '../model/NCloudLaunchConfiguration';
import { NCloudMySQL } from '../model/NCloudMySQL';

export function parseToNCloudModel(resource: any): NCloudModel {
    const { type, name, properties } = resource;

    switch (type.toLowerCase()) {
        case 'vpc':
            return new NCloudVPC({
                name: name || 'vpc',
                ipv4CidrBlock: properties.cidrBlock,
            });

        case 'networkacl':
            return new NCloudNetworkACL({
                name: name || 'nacl',
                vpcName: properties.vpcName,
            });

        case 'subnet':
            console.log('subnet properties', properties);
            return new NCloudSubnet({
                name: name || 'subnet',
                subnet: properties.subnet,
                zone: properties.zone,
                subnetType: properties.subnetType,
                usageType: properties.usageType,
                vpcName: properties.vpcName,
                networkAclNo: properties.networkAclNo,
            });

        case 'acg':
        case 'accesscontrolgroup':
            return new NCloudACG({
                name: name || 'acg',
                description: properties.description,
                vpcName: properties.vpcName,
            });

        case 'acgrule':
        case 'accesscontrolgrouprule':
            return new NCloudACGRule({
                protocol: properties.protocol,
                ipBlock: properties.ip_block,
                portRange: properties.port_range,
                description: properties.description,
                acgName: properties.acgName,
                name: name,
            });

        case 'loginkey':
            return new NCloudLoginKey({
                name: name || 'login-key',
            });

        case 'networkinterface':
            return new NCloudNetworkInterface({
                name: name || 'nic',
                subnetName: properties.subnetName,
                acgName: properties.acgName,
            });

        case 'server':
            return new NCloudServer({
                name: name || 'server',
                serverImageNumber: properties.server_image_number,
                serverSpecCode: properties.server_spec_code,
                subnetName: properties.subnet,
            });

        case 'publicip':
            return new NCloudPublicIP({
                name: name || 'public-ip',
                description: properties.description,
                serverName: properties.serverName,
            });

        case 'loadbalancer':
            return new NCloudLoadBalancer({
                name: name || 'lb',
                networkType: properties.networkType,
                throughputType: properties.throughputType,
                subnetName: properties.subnet,
                vpcName: properties.vpcName,
                acgName: properties.acgName,
            });

        case 'launchconfiguration':
            return new NCloudLaunchConfiguration({
                name: name || 'launch-config',
                serverImageProductCode: properties.serverImageProductCode,
                serverProductCode: properties.serverProductCode,
            });

        case 'mysql':
            if (
                !properties.serverNamePrefix ||
                !properties.userName ||
                !properties.userPassword ||
                !properties.hostIp ||
                !properties.databaseName
            ) {
                throw new Error(
                    'userPassword, histIp, databaseName이 필요합니다',
                );
            }
            return new NCloudMySQL({
                serviceName: name || 'mysql',
                serverNamePrefix: properties.serverNamePrefix,
                userName: properties.userName,
                userPassword: properties.userPassword,
                hostIp: properties.hostIp,
                databaseName: properties.databaseName,
                subnet: properties.subnet,
                vpc: properties.vpc,
            });
        default:
            throw new Error(`Unsupported resource type: ${type}`);
    }
}
