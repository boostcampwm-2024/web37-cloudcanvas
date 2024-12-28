import { NCloudModel } from '../../interface/NCloudModel';

export interface ResourceParsingStrategy{
    parse(properties: any): NCloudModel;
    canParse(type: string): boolean;
}