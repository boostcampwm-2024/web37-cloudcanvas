import { NODE_BASE_SIZE } from '@constants';
import { Dimension, Group, Node, Size3D } from '@types';
import { convert2dTo3dPoint, convert3dTo2dPoint } from '@utils';
import { getNodeOffsetForDimension } from './node';

export const GraphGroup = {
    id: '',
    type: '',
    nodeIds: [],
    properties: {},
    childGroupIds: [],
    parentGroupId: '',
};

export const computeBounds = (
    nodes: Node[],
    dimension: Dimension,
    paddingSize: number = 1,
) => {
    const padding = 90 * paddingSize;

    if (dimension === '2d') {
        const minX = Math.min(...nodes.map((node) => node.point.x));
        const minY = Math.min(...nodes.map((node) => node.point.y));
        const maxX = Math.max(
            ...nodes.map((node) => node.point.x + node.size['2d'].width),
        );
        const maxY = Math.max(
            ...nodes.map((node) => node.point.y + node.size['2d'].height),
        );

        return {
            x: minX - padding,
            y: minY - padding,
            width: maxX - minX + padding * 2,
            height: maxY - minY + padding * 2,
        };
    }

    if (dimension === '3d') {
        //2d
        nodes = nodes.map((node) => {
            const offset = getNodeOffsetForDimension(
                node.size['3d'],
                NODE_BASE_SIZE['3d'] as Size3D,
            );
            const pos = convert3dTo2dPoint({
                x: node.point.x - offset.x,
                y: node.point.y - offset.y,
            });
            return {
                ...node,
                point: { x: pos.x, y: pos.y },
            };
        });
        const minX = Math.min(...nodes.map((node) => node.point.x));
        const minY = Math.min(...nodes.map((node) => node.point.y));
        const maxX = Math.max(
            ...nodes.map((node) => node.point.x + node.size['2d'].width),
        );
        const maxY = Math.max(
            ...nodes.map((node) => node.point.y + node.size['2d'].height),
        );

        const { x, y } = convert2dTo3dPoint({
            x: minX - padding,
            y: minY - padding,
        });
        return {
            x,
            y,
            width: maxX - minX + padding * 2,
            height: maxY - minY + padding * 2,
        };
    }
};

export const findParentGroup = (
    groups: { [id: string]: Group },
    childId: string,
): Group | undefined => {
    return Object.values(groups).find((group) =>
        group.childGroupIds.includes(childId),
    );
};
