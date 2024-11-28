import { ResourceManager } from '../type/ResourceManager';
import { CodeGenerator } from '../type/TerraformGenerator';
import { NCloudProvider } from '../model/NCloudProvider';
import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { parseToNCloudModel } from '../util/resourceParser';
import { processNodes } from '../util/resource';
import { collectRegions, createProvider } from '../util/provider';

export class TerraformConvertor {
    private readonly resourceManager: ResourceManager;
    private readonly codeGenerator: CodeGenerator;
    private providers: Map<string, NCloudProvider>;

    constructor() {
        this.resourceManager = new ResourceManager();
        this.codeGenerator = new CodeGenerator(this.resourceManager);
        this.providers = new Map();
    }

    addResourceFromJson(node: any): void {
        const nodes = processNodes([node]);
        const regions = collectRegions(nodes);

        regions.forEach((region) => {
            this.providers.set(region, createProvider(region));
        });
        nodes.forEach((node) => {
            try {
                const resource = parseToNCloudModel(node);
                this.resourceManager.addResource(
                    resource,
                    node.properties?.region,
                );
            } catch (error) {
                console.warn(error);
            }
        });
    }

    generate(): string {
        if (this.providers.size === 0) {
            throw new Error(
                'No providers initialized. Make sure to add resources with region information first.',
            );
        }
        return this.codeGenerator.generateCode([...this.providers.values()]);
    }
}
