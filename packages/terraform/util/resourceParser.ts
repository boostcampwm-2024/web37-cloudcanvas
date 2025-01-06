import { ResourceParserFactory } from '../parser/ResourceParserFactory';
import { NCloudModel } from '../interface/NCloudModel';

export function parseToNCloudModel(resource: any): NCloudModel {
    const { type, properties } = resource;
    return ResourceParserFactory.parseResource(type, properties);
}