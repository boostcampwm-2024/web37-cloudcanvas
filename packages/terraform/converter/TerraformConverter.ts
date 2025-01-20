import { ResourceManager } from '../type/ResourceManager';
import { CodeGenerator } from '../type/TerraformGenerator';
import { NCloudProvider } from '../model/ncloudProvider/NCloudProvider';
import { parseToNCloudModel } from '../util/resourceParser';
import { processNodes } from '../util/resource';
import { collectRegions, createProvider } from '../util/provider';
import {
    initializeValidation,
    ResourceValidator,
    ValidationError,
} from 'property_validation';

export class TerraformConverter {
    private readonly resourceManager: ResourceManager;
    private readonly codeGenerator: CodeGenerator;
    private providers: Map<string, NCloudProvider>;

    constructor() {
        this.resourceManager = new ResourceManager();
        this.codeGenerator = new CodeGenerator(this.resourceManager);
        this.providers = new Map();
        initializeValidation();
    }

    addResourceFromJson(node: { [key: string]: any }[]): void {
        if (!node) {
            throw new Error('유효하지 않은 노드입니다');
        }
        const nodes = processNodes(node);
        const regions = collectRegions(nodes);

        regions.forEach((region) => {
            this.providers.set(region, createProvider(region));
        });
        nodes.forEach((node) => {
            try {
                const resource = parseToNCloudModel(node);
                ResourceValidator.validate(node.type, resource.getProperties());
                this.resourceManager.addResource(
                    resource,
                    node.properties?.region,
                );
            } catch (error) {
                if (error instanceof ValidationError) {
                    console.error(`속성 검증이 실패했습니다.`);
                    throw error;
                }
                console.warn(error);
            }
        });
    }

    generate(): string {
        if (this.providers.size === 0) {
            throw new Error('provider가 없습니다');
        }
        return this.codeGenerator.generateCode([...this.providers.values()]);
    }
}
