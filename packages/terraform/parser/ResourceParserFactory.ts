import { ResourceParsingStrategy } from '../util/interface/ResourceParsingStrategy';
import { VPCParser } from './VPCParser';
import { NCloudModel } from '../interface/NCloudModel';
import { MySQLParesr } from './MySQLParesr';
import { ServerParser } from './ServerParser';
import { SubnetParser } from './SubnetParser';
import { LaunchConfigurationParser } from './LaunchConfigurationParser';
import { RedisParser } from './RedisParser';
import { NKsClusterParser } from './NKsClusterParser';

export class ResourceParserFactory {
    private static strategy: ResourceParsingStrategy[] = [
        new VPCParser(),
        new MySQLParesr(),
        new ServerParser(),
        new SubnetParser(),
        new LaunchConfigurationParser(),
        new RedisParser(),
        new NKsClusterParser(),
    ];

    static getParser(type: string): ResourceParsingStrategy {
        const parser = this.strategy.find((s) => s.canParse(type));
        if (!parser) {
            throw new Error('올바르지 않은 리소스 타입입니다');
        }
        return parser;
    }

    static parseResource(type: string, properties: any): NCloudModel {
        const parser = this.getParser(type);
        return parser.parse(properties);
    }

    static registerParser(parser: ResourceParsingStrategy): void {
        this.strategy.push(parser);
    }
}
