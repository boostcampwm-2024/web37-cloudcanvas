import { NODE_BASE_SIZE } from '@constants';
import { Dimension, Node, Point, Size, Size3D } from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
} from '@utils';

export const GraphNode = {
    id: '',
    type: '',
    point: { x: 0, y: 0 },
    connectors: {},
};

export const getNodeOffsetForDimension = (
    nodeSize: Size & Size3D,
    baseSize: Size,
) => {
    if (nodeSize.width % 128 === 0 && nodeSize.height % 111 === 0) {
        return {
            x: 0,
            y: 0,
        };
    }
    return {
        x: (baseSize.width - nodeSize.width) / 2,
        y: baseSize.height - nodeSize.height - (nodeSize.offset || 0),
    };
};

//INFO: 처음이 2d로 시작하기 때문에 nodeSize : 3d , baseSize : 3d로 해야함. 다른 방법은 잘 모르곘음.
//2d에서 3d로 변환할 때는 3d에서 2d로 변환할 때와 달리 baseSize와 nodeSize가 2d 사이즈 들어가야 할 것 같음
export const adjustNodePointForDimension = (
    point: Point,
    size: Size3D,
    dimension: Dimension,
) => {
    const offset = getNodeOffsetForDimension(
        size,
        NODE_BASE_SIZE['3d'] as Size3D,
    );
    let result;
    if (dimension === '2d') {
        result = convert3dTo2dPoint({
            x: point.x - offset.x,
            y: point.y - offset.y,
        });
    } else {
        result = convert2dTo3dPoint(point);
        result = {
            x: result.x + offset.x,
            y: result.y + offset.y,
        };
    }

    return result;
};
export const alignNodePoint = (
    node: Node,
    newPoint: Point,
    dimension: Dimension,
) => {
    let result = newPoint;
    if (dimension === '2d') {
        result = alignPoint2d(result);
    } else {
        const adjustPoint = {
            x: result.x + node.size[dimension].width / 2,
            y: result.y + node.size[dimension].height,
        };
        result = alignPoint3d(adjustPoint);
        result = {
            x: result.x - node.size[dimension].width / 2,
            y:
                result.y -
                node.size[dimension].height -
                (node.size[dimension].offset || 0),
        };
    }

    return result;
};

export const calculateNodeBoundingBox = (
    nodes: Record<string, Node>,
    dimension: Dimension,
) => {
    const nodesArr = Object.values(nodes);

    const minX = Math.min(...nodesArr.map((node) => node.point.x));
    const minY = Math.min(...nodesArr.map((node) => node.point.y));

    const maxX = Math.max(
        ...nodesArr.map((node) => node.point.x + node.size[dimension].width),
    );
    const maxY = Math.max(
        ...nodesArr.map((node) => node.point.y + node.size[dimension].height),
    );

    const width = maxX - minX;
    const height = maxY - minY;

    return { minX, minY, width, height };
};
