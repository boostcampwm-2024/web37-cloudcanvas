import { GRID_2D_SIZE } from '@constants';
import { Bounds, Dimension, Group } from '@types';
import { convert2dTo3dPoint, convert3dTo2dPoint } from '@utils';

export const GraphGroup = {
    id: '',
    type: '',
    nodeIds: [],
    properties: {},
    childGroupIds: [],
    parentGroupId: '',
};

export const computeBounds = (_bounds: Bounds[], dimension: Dimension) => {
    const padding = GRID_2D_SIZE * 2;
    let bounds = _bounds;
    if (dimension === '3d') {
        bounds = bounds.map((bound) => ({
            ...bound,
            ...convert3dTo2dPoint({
                x: bound.x,
                y: bound.y,
            }),
        }));
    }

    const minX = Math.min(...bounds.map((bounds) => bounds.x));
    const minY = Math.min(...bounds.map((bounds) => bounds.y));
    const maxX = Math.max(...bounds.map((bounds) => bounds.x + bounds.width));
    const maxY = Math.max(...bounds.map((bounds) => bounds.y + bounds.height));

    let x = minX - padding;
    let y = minY - padding;
    let width = maxX - minX + padding * 2;
    let height = maxY - minY + padding * 2;

    if (dimension === '3d') {
        const minPoint = convert2dTo3dPoint({
            x: minX - padding,
            y: minY - padding,
        });
        x = minPoint.x;
        y = minPoint.y;
    }

    return {
        x,
        y,
        width,
        height,
    };
};

export const findParentGroup = (
    groups: { [id: string]: Group },
    childId: string,
): Group | undefined => {
    return Object.values(groups).find((group) =>
        group.childGroupIds.includes(childId),
    );
};
