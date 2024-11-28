import { NODE_BASE_SIZE } from '@constants';
import { Dimension, Node, Point, Size } from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
} from '@utils';

const getNodeOffsetForDimension = (nodeSize: Size, baseSize: Size) => {
    return {
        x: (baseSize.width - nodeSize.width) / 2,
        y: baseSize.height - nodeSize.height - (nodeSize.offset || 0),
    };
};

//INFO: 처음이 2d로 시작하기 때문에 nodeSize : 3d , baseSize : 3d로 해야함. 다른 방법은 잘 모르곘음.
//2d에서 3d로 변환할 때는 3d에서 2d로 변환할 때와 달리 baseSize와 nodeSize가 2d 사이즈 들어가야 할 것 같음
export const adjustNodePointForDimension = (
    node: Node,
    dimension: Dimension,
) => {
    const { point, size } = node;

    const offset = getNodeOffsetForDimension(size['3d'], NODE_BASE_SIZE['3d']);
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

export const getNodeBounds = (node: Node, dimension: Dimension) => {
    return {
        x: node.point.x,
        y: node.point.y,
        width: node.size[dimension].width,
        height: node.size[dimension].height,
    };
};
