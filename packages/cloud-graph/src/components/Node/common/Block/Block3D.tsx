import Polygon from '@/components/Svg/Polygon';
import Stroke from '@/components/Svg/Stroke';
import { GRID_HEIGHT_3D, GRID_WIDTH_3D } from '@/constants';
import { GridSize } from '@/types';

type Block3DProps = {
    size: GridSize;
};

const calculate3DBoxPoints = (size: GridSize) => {
    const z = GRID_HEIGHT_3D / 2;
    const width = GRID_WIDTH_3D * size.cols;
    const height = GRID_HEIGHT_3D * size.rows;

    return [
        { x: 0, y: -z }, // topLeft
        { x: Math.floor(width / 2), y: Math.floor(height / 2) - z }, // topRight
        { x: 0, y: height - z }, // bottomRight
        { x: -Math.floor(width / 2), y: Math.floor(height / 2) - z }, // bottomLeft
    ];
};

function Box3D(props: Block3DProps) {
    const { size } = props;
    const points = calculate3DBoxPoints(size);
    const z = GRID_HEIGHT_3D / 2;

    return (
        <>
            <Polygon points={points} fill="#ececed" />
            <Polygon
                points={[
                    points[3],
                    points[2],
                    { x: points[2].x, y: points[2].y + z },
                    { x: points[3].x, y: points[3].y + z },
                ]}
                fill="#d2d2d4"
                stroke="#83838a"
            />
            <Polygon
                points={[
                    points[2],
                    points[1],
                    { x: points[1].x, y: points[1].y + z },
                    { x: points[2].x, y: points[2].y + z },
                ]}
                fill="#b8b8bb"
                stroke="#83838a"
            />
            <Stroke
                points={[
                    points[0],
                    points[1],
                    { x: points[1].x, y: points[1].y + z },
                    { x: points[2].x, y: points[2].y + z },
                    { x: points[3].x, y: points[3].y + z },
                    { x: points[3].x, y: points[3].y },
                ]}
            />
        </>
    );
}

export default Box3D;
