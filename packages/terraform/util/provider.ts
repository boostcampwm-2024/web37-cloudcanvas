import { NCloudProvider } from '../model/ncloudProvider/NCloudProvider';
import { CloudCanvasNode } from '../interface/CloudCanvasNode';

export const createProvider = (region: string): NCloudProvider =>
    new NCloudProvider({
        accessKey: 'var.access_key',
        secretKey: 'var.secret_key',
        region: region,
        site: 'public',
        alias: region.toLowerCase(),
    });

export const collectRegions = (nodes: any[]): Set<string> => {
    const regions = new Set<string>();
    nodes.forEach((node) => {
        if (node.properties?.region) {
            regions.add(node.properties.region);
        }
    });
    return regions;
};
