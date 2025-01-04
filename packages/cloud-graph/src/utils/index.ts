import { GRID_HEIGHT_3D, GRID_SIZE_2D, GRID_WIDTH_3D } from '@/constants';
import { Dimension, GridPoint, ScreenPoint } from '@/types';

const gridToScreen3d = (point: GridPoint) => {
    const { col, row } = point;

    const x = (col - row) * (GRID_WIDTH_3D / 2);
    const y = (col + row) * (GRID_HEIGHT_3D / 2);

    return { x, y };
};

const screenToGrid3d = (point: ScreenPoint) => {
    const { x, y } = point;

    const GRID_WIDTH_3D_HALF = GRID_WIDTH_3D / 2;
    const GRID_HEIGHT_3D_HALF = GRID_HEIGHT_3D / 2;
    const col = (x / GRID_WIDTH_3D_HALF + y / GRID_HEIGHT_3D_HALF) / 2;
    const row = (y / GRID_HEIGHT_3D_HALF - x / GRID_WIDTH_3D_HALF) / 2;

    return { col, row };
};

const screenToGrid2d = (point: ScreenPoint) => {
    const { x, y } = point;
    const col = x / GRID_SIZE_2D;
    const row = y / GRID_SIZE_2D;

    return { col, row };
};

const gridToScreen2d = (point: GridPoint) => {
    const { col, row } = point;
    const x = col * GRID_SIZE_2D;
    const y = row * GRID_SIZE_2D;
    return { x, y };
};

export const gridToScreen = (point: GridPoint, dimension: Dimension) => {
    return dimension === '3d' ? gridToScreen3d(point) : gridToScreen2d(point);
};

export const screenToGrid = (point: ScreenPoint, dimension: Dimension) => {
    return dimension === '3d' ? screenToGrid3d(point) : screenToGrid2d(point);
};

export const getSvgPoint = (svg: SVGSVGElement, point: ScreenPoint) => {
    const { x, y } = point;
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = x;
    svgPoint.y = y;
    const screenCTM = svg.getScreenCTM();
    return svgPoint.matrixTransform(screenCTM!.inverse());
};

export const snapToGrid = (
    point: ScreenPoint,
    dimension: Dimension,
    denominator = 4,
) => {
    const cellWidth = dimension === '3d' ? GRID_WIDTH_3D : GRID_SIZE_2D;
    const cellHeight = dimension === '3d' ? GRID_HEIGHT_3D : GRID_SIZE_2D;

    const snapWidth = cellWidth / denominator;
    const snapHeight = cellHeight / denominator;

    if (Math.abs(point.x) < snapWidth && Math.abs(point.y) < snapHeight)
        return null;

    const snappedX = Math.round(point.x / snapWidth) * snapWidth;
    const snappedY = Math.round(point.y / snapHeight) * snapHeight;

    const screenToGrid = dimension === '3d' ? screenToGrid3d : screenToGrid2d;

    return {
        screen: { x: snappedX, y: snappedY },
        grid: screenToGrid({ x: snappedX, y: snappedY }),
    };
};
