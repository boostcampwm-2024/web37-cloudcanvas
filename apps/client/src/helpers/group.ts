import { NODE_BASE_SIZE } from '@constants';
import { Dimension, Group, Node, Size3D } from '@types';
import { convert2dTo3dPoint, convert3dTo2dPoint } from '@utils';
import { calculateNodeBoundingBox, getNodeOffsetForDimension } from './node';

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
        const { minX, minY, width, height } = calculateNodeBoundingBox(
            Object.values(nodes),
            '2d',
        );

        return {
            x: minX - padding,
            y: minY - padding,
            width: width + padding * 2,
            height: height + padding * 2,
        };
    } else {
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

        const { minX, minY, width, height } = calculateNodeBoundingBox(
            Object.values(nodes),
            '2d',
        );
        const { x, y } = convert2dTo3dPoint({
            x: minX - padding,
            y: minY - padding,
        });
        return {
            x,
            y,
            width: width + padding * 2,
            height: height + padding * 2,
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
