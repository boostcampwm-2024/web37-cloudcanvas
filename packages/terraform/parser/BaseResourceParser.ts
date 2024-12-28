import { ResourceParsingStrategy } from '../util/interface/ResourceParsingStrategy';
import { NCloudModel } from '../interface/NCloudModel';

export abstract class BaseResourceParser implements ResourceParsingStrategy {
    protected abstract resourceType: string[];

    protected abstract createModel(properties: any): NCloudModel;

    canParse(type: string): boolean {
        return this.resourceType.includes(type.toLowerCase());
    }

    parse(properties: any): NCloudModel {
        this.validateProperties(properties);
        return this.createModel(properties);
    }

    protected validateProperties(properties: any): void {}

    protected getNameOrDefault(properties: any, defaultPrefix: string): string {
        return (
            properties.name?.toLowerCase() || `${defaultPrefix}-${Date.now()}`
        );
    }
}
