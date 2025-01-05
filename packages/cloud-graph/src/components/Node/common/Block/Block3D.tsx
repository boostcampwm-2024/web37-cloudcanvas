import Polygon from '@/components/Svg/Polygon';
import Stroke from '@/components/Svg/Stroke';
import { GRID_HEIGHT_3D, GRID_WIDTH_3D } from '@/constants';
import { GridSize } from '@/types';

type Block3DProps = {
    size: Required<GridSize>;
};

const calculate3DBoxPoints = (size: Required<GridSize>) => {
    const { cols, rows, depth } = size;
    const width = GRID_WIDTH_3D * cols;
    const height = GRID_HEIGHT_3D * rows;

    return [
        { x: 0, y: -depth }, // topLeft
        { x: Math.floor(width / 2), y: Math.floor(height / 2) - depth }, // topRight
        { x: 0, y: height - depth }, // bottomRight
        { x: -Math.floor(width / 2), y: Math.floor(height / 2) - depth }, // bottomLeft
    ];
};

function Box3D(props: Block3DProps) {
    const { size } = props;
    const { depth } = size;
    const points = calculate3DBoxPoints(size);

    return (
        <>
            <Polygon points={points} fill="#ececed" />
            <Polygon
                points={[
                    points[3],
                    points[2],
                    { x: points[2].x, y: points[2].y + depth },
                    { x: points[3].x, y: points[3].y + depth },
                ]}
                fill="#d2d2d4"
                stroke="#83838a"
            />
            <Polygon
                points={[
                    points[2],
                    points[1],
                    { x: points[1].x, y: points[1].y + depth },
                    { x: points[2].x, y: points[2].y + depth },
                ]}
                fill="#b8b8bb"
                stroke="#83838a"
            />
            <Stroke
                points={[
                    points[0],
                    points[1],
                    { x: points[1].x, y: points[1].y + depth },
                    { x: points[2].x, y: points[2].y + depth },
                    { x: points[3].x, y: points[3].y + depth },
                    { x: points[3].x, y: points[3].y },
                ]}
            />
        </>
    );
}

export default Box3D;
