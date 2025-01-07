import { replaceReferences } from '../util/reference';
import {
    generateProviderBlock,
    generateResourceBlock,
    generateTerraformBlock,
} from '../util/generator';
import { ResourceManager } from './ResourceManager';
import { NCloudProvider } from '../model/ncloudProvider/NCloudProvider';

export class CodeGenerator {
    private resourceManager: ResourceManager;

    constructor(resourceManager: ResourceManager) {
        this.resourceManager = resourceManager;
    }

    generateCode(providers: NCloudProvider[]): string {
        const terraformBlock = generateTerraformBlock(
            'NaverCloudPlatform/ncloud',
            '>= 0.13',
        );

        const blocks = [
            terraformBlock,
            ...providers.map((provider) =>
                generateProviderBlock(provider.name, provider.getProperties()),
            ),
            ...this.generateResourceBlocks(),
        ];

        return blocks.join('\n');
    }

    private generateResourceBlocks(): string[] {
        return this.resourceManager
            .getResources()
            .map(({ resource, region }) => {
                const properties = replaceReferences(
                    resource.getProperties(),
                    this.resourceManager.getNameMap(),
                );

                if (region) {
                    properties.provider = `ncloud.${region.toLowerCase()}`;
                }
                const resourceName = resource.name || resource.serviceType;
                return generateResourceBlock(
                    resource.serviceType,
                    resourceName,
                    properties,
                );
            });
    }
}
