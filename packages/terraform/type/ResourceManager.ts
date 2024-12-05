import { NCloudModel } from '../interface/NCloudModel';

export class ResourceManager {
    private resources: Array<{ resource: NCloudModel; region?: string }>;
    private resourceNameMap: Map<string, Set<string | undefined>>;
    private readonly nameMap: Map<string, string>;
    private readonly regionMap: Map<string, Set<string>>;

    constructor() {
        this.resources = [];
        this.nameMap = new Map();
        this.regionMap = new Map();
        this.resourceNameMap = new Map();
    }

    addResource(resource: NCloudModel, region?: string): void {
        if (!this.resourceNameMap.has(resource.serviceType)) {
            this.resourceNameMap.set(resource.serviceType, new Set());
        }
        const namesSet = this.resourceNameMap.get(resource.serviceType)!;

        if (namesSet.has(resource.name)) {
            console.warn(
                `Resource ${resource.serviceType} with name ${resource.name} already exists. Skipping...`,
            );
            return;
        }

        this.resources.push({ resource, region });
        namesSet.add(resource.name);

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
        return [...this.resources];
    }

    getNameMap(): Map<string, string> {
        return this.nameMap;
    }
}
