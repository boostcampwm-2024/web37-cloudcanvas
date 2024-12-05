import { GRID_2D_SIZE } from '@constants';
import { Dimension, Node, ViewBox } from '@types';
import { calculateNodeBoundingBox } from './node';

export const calcViewBoxBounds = (
    nodes: Record<string, Node>,
    viewBox: ViewBox,
    dimension: Dimension,
) => {
    const allNodeBounds = calculateNodeBoundingBox(
        Object.values(nodes),
        dimension,
    );
    const viewBoxCenter = {
        x: viewBox.x + viewBox.width / 2,
        y: viewBox.y + viewBox.height / 2,
    };
    const allNodeCenter = {
        x: allNodeBounds.minX + allNodeBounds.width / 2,
        y: allNodeBounds.minY + allNodeBounds.height / 2,
    };

    const diff = {
        x: viewBoxCenter.x - allNodeCenter.x,
        y: viewBoxCenter.y - allNodeCenter.y,
    };

    let newWidth =
        viewBox.width < allNodeBounds.width
            ? allNodeBounds.width
            : viewBox.width;
    let newHeight =
        viewBox.height < allNodeBounds.height
            ? allNodeBounds.height
            : viewBox.height;

    return {
        x: viewBox.x - diff.x,
        y: viewBox.y - diff.y,
        width: newWidth,
        height: newHeight,
    };
};
