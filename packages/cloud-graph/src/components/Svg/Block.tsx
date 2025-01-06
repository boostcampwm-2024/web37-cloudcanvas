import Polygon from '@/components/Svg/Polygon';
import { GRID_HEIGHT_3D, GRID_WIDTH_3D } from '@/constants';
import { GridSize } from '@/types';

type BlockProps = {
    size: Required<GridSize>;
    children?: React.ReactNode;
};

export const calculateBlockPoints = (size: Required<GridSize>) => {
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

function Block(props: BlockProps) {
    const { size, children } = props;
    const { depth } = size as Required<GridSize>;
    const points = calculateBlockPoints(size as Required<GridSize>);

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
            {children && children}
        </>
    );
}

export default Block;
