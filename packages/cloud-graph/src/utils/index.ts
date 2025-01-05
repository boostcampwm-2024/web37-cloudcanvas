import { GRID_HEIGHT_3D, GRID_SIZE_2D, GRID_WIDTH_3D } from '@/constants';
import { Dimension, GridPoint, Node, ScreenPoint } from '@/types';

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
    const gridPoint = screenToGrid(point, dimension);
    const snappedSize = 1 / denominator;

    const snappedCol = Math.round(gridPoint.col / snappedSize) * snappedSize;
    const snappedRow = Math.round(gridPoint.row / snappedSize) * snappedSize;

    return {
        screen: gridToScreen({ col: snappedCol, row: snappedRow }, dimension),
        grid: { col: snappedCol, row: snappedRow },
    };
};

export const getConnectorPoints = (node: Node, dimension: Dimension) => {
    const nodeSize = node.size[dimension];
    const centerGridPoint = {
        col: node.point.col + nodeSize.cols / 2,
        row: node.point.row + nodeSize.rows / 2,
    };

    return node.connectors.map((connector) =>
        gridToScreen(
            {
                col: centerGridPoint.col + connector.col,
                row: centerGridPoint.row + connector.row,
            },
            dimension,
        ),
    );
};
