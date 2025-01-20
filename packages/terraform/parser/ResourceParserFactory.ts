import { ResourceParsingStrategy } from '../util/interface/ResourceParsingStrategy';
import { VPCParser } from './vpc/VPCParser';
import { NCloudModel } from '../interface/NCloudModel';
import { MySQLParesr } from './mysql/MySQLParesr';
import { ServerParser } from './server/ServerParser';
import { SubnetParser } from './vpc/SubnetParser';
import { LaunchConfigurationParser } from './autoScaling/LaunchConfigurationParser';
import { RedisParser } from './redis/RedisParser';
import { NKsClusterParser } from './kubernetesService/NKsClusterParser';
import { RedisConfigGroupParser } from './redis/RedisConfigGroupParser';
import { ObjectStorageBucketParser } from './objectStorage/ObjectStorageBucketParser';
import { NatGatewayParser } from './vpc/NatGatewayParser';

export class ResourceParserFactory {
    private static strategy: ResourceParsingStrategy[] = [
        new VPCParser(),
        new MySQLParesr(),
        new ServerParser(),
        new SubnetParser(),
        new LaunchConfigurationParser(),
        new RedisParser(),
        new RedisConfigGroupParser(),
        new NKsClusterParser(),
        new ObjectStorageBucketParser(),
        new NatGatewayParser(),
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
