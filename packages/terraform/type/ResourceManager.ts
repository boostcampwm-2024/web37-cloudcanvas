import { NCloudModel } from '../interface/NCloudModel';

export class ResourceManager {
    private resources: Array<{ resource: NCloudModel; region?: string }>;
    private readonly nameMap: Map<string, string>;
    private readonly regionMap: Map<string, Set<string>>;

    constructor() {
        this.resources = [];
        this.nameMap = new Map();
        this.regionMap = new Map();
    }

    addResource(resource: NCloudModel, region?: string): void {
        this.resources.push({ resource, region });

        if (resource.name) {
            this.nameMap.set(resource.serviceType, resource.name);
        }

        if (region) {
            if (!this.regionMap.has(resource.serviceType)) {
                this.regionMap.set(resource.serviceType, new Set());
            }
            this.regionMap.get(resource.serviceType)?.add(region);
        }
    }

    getResources(): Array<{ resource: NCloudModel; region?: string }> {
        return [...this.resources].sort(
            (a, b) => a.resource.priority - b.resource.priority,
        );
    }

    getNameMap(): Map<string, string> {
        return this.nameMap;
    }
}
