import Polygon from '@/components/Svg/Polygon';
import Stroke from '@/components/Svg/Stroke';
import { GRID_SIZE_2D } from '@/constants';
import { GridSize } from '@/types';

type Block2DProps = {
    size: GridSize;
};

const calculate2DBoxPoints = (size: GridSize) => {
    const width = GRID_SIZE_2D * size.cols;
    const height = GRID_SIZE_2D * size.rows;

    return [
        { x: 0, y: 0 }, // topLeft
        { x: width, y: 0 }, // topRight
        { x: width, y: height }, // bottomRight
        { x: 0, y: height }, // bottomLeft
    ];
};

function Box2D(props: Block2DProps) {
    const { size } = props;
    const points = calculate2DBoxPoints(size);
    return (
        <>
            <Polygon points={points} fill="#ececed" stroke="#000000" />
            <Stroke points={points} stroke="#000" strokeWidth={2} />
        </>
    );
}

export default Box2D;
