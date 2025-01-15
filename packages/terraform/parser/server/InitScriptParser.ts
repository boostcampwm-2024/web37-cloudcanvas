import { BaseResourceParser } from './BaseResourceParser';
import { NCloudInitScript } from '../model/server/NCloudInitSciprt';

export class InitScriptParser extends BaseResourceParser {
    protected resourceType = ['init_script'];

    protected createModel(properties: any): NCloudInitScript {
        return new NCloudInitScript({
            name: this.getNameOrDefault(properties, 'init-script'),
            content: properties.content,
            description: properties.description,
            osType: properties.os_type,
        });
    }
}