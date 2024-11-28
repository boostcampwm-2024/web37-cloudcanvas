import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import {
    createAcgDependencies,
    createLoginKeyDependency,
    createNicDependency,
    createSubnetDependency,
    createVpcDependency,
} from './dependency';

export const processDependencies = (node: any): any[] => {
    if (!['server', 'loadbalancer', 'mysql'].includes(node.type.toLowerCase()))
        return [];

    const dependencies: CloudCanvasNode[] = [];
    const { properties } = node;
    if (properties.vpc) {
        dependencies.push(createVpcDependency(properties));
    }
    if (properties.subnet) {
        dependencies.push(createSubnetDependency(properties, node.type));
    }
    if (properties.acg) {
        dependencies.push(...createAcgDependencies(properties, node.name));
    }

    // if (node.type.toLowerCase() === 'server') {
    //     // if (properties.nic) {
    //     //     dependencies.push(createNicDependency(properties));
    //     // }
    //     // if (properties.loginKey) {
    //     //     dependencies.push(createLoginKeyDependency(properties));
    //     // }
    // }

    return dependencies;
};

export const processNodes = (nodes: any[]): any[] =>
    nodes.reduce(
        (acc: CloudCanvasNode[], node) => [
            ...acc,
            ...processDependencies(node),
            node,
        ],
        [],
    );
