type ReferenceMap = Map<string, string>;

export class ReferenceReplacer {
    private referenceCache = new Map<string, string>();

    constructor(private resourceNameMap: ReferenceMap) {}

    replaceReferences(properties: { [key: string]: any }): {
        [key: string]: any;
    } {
        const result = { ...properties };

        for (const [key, value] of Object.entries(result)) {
            result[key] = this.transformValue(value);
        }

        return result;
    }

    private transformValue(value: any): any {
        if (typeof value === 'string') {
            return this.getCachedReference(value);
        }

        if (Array.isArray(value)) {
            return value.map((item) => this.transformValue(item));
        }

        if (typeof value === 'object' && value !== null) {
            const transformed = { ...value };
            for (const [k, v] of Object.entries(transformed)) {
                transformed[k] = this.transformValue(v);
            }
            return transformed;
        }

        return value;
    }

    private getCachedReference(value: string): string {
        const startTime = performance.now();

        if (this.referenceCache.has(value)) {
            const result = this.referenceCache.get(value)!;
            return result;
        }

        const resolvedReference = this.resolveReference(value);
        this.referenceCache.set(value, resolvedReference);

        return resolvedReference;
    }

    private resolveReference(value: string): string {
        if (value.startsWith('ncloud_')) {
            return value;
        }

        const resourceTypeMap = new Map([
            ['vpc', 'ncloud_vpc'],
            ['subnet', 'ncloud_subnet'],
            ['acg', 'ncloud_access_control_group'],
            ['nic', 'ncloud_network_interface'],
            ['server', 'ncloud_server'],
            ['loginkey', 'ncloud_login_key'],
            ['nacl', 'ncloud_network_acl'],
            ['publicip', 'ncloud_public_ip'],
        ]);

        if (value.endsWith('.default_network_acl_no')) {
            const resourceName = value.split('.')[0];
            return `${resourceTypeMap.get('vpc')}.${resourceName}.default_network_acl_no`;
        }

        if (value.endsWith('.id')) {
            const resourceName = value.split('.')[0];
            const resourceType = resourceTypeMap.get(
                resourceName.split('-')[0],
            );
            return `${resourceType}.${resourceName}.id`;
        }

        return value;
    }
}
