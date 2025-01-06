import { ReferenceReplacer } from './ReferenceReplacer';

type ReferenceMap = Map<string, string>;

export const resolveReference = (resourceId: string): string => {
    if (resourceId.startsWith('ncloud_')) {
        return resourceId;
    }

    const resourceTypeMap: { [key: string]: string } = {
        vpc: 'ncloud_vpc',
        subnet: 'ncloud_subnet',
        acg: 'ncloud_access_control_group',
        nic: 'ncloud_network_interface',
        server: 'ncloud_server',
        loginkey: 'ncloud_login_key',
        nacl: 'ncloud_network_acl',
        publicip: 'ncloud_public_ip',
    };

    if (resourceId.endsWith('.default_network_acl_no')) {
        const resourceName = resourceId.split('.')[0];
        return `${resourceTypeMap['vpc']}.${resourceName}.default_network_acl_no`;
    }

    if (resourceId.endsWith('.id')) {
        const resourceName = resourceId.split('.')[0];
        const resourceType = resourceTypeMap[resourceName.split('-')[0]];
        return `${resourceType}.${resourceName}.id`;
    }

    return resourceId;
};

export function replaceReferences(
    properties: { [key: string]: any },
    resourceNameMap: ReferenceMap
): { [key: string]: any } {
    const replacer = new ReferenceReplacer(resourceNameMap);
    return replacer.replaceReferences(properties);
}
