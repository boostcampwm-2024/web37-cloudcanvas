import Rect from '@/components/Svg/Rect';
import { GRID_SIZE_2D } from '@/constants';
import Stroke from '@/components/Svg/Stroke';
import { GridSize } from '@/types';

type Container2DProps = {
    size: GridSize;
};

function Container2D(props: Container2DProps) {
    const { size } = props;
    const width = GRID_SIZE_2D * size.cols;
    const height = GRID_SIZE_2D * size.rows;

    const strokePoints = [
        { x: 0, y: 0 }, // topLeft
        { x: width, y: 0 }, // topRight
        { x: width, y: height }, // bottomRight
        { x: 0, y: height }, // bottomLeft
    ];

    return (
        <>
            <Rect width={width} height={height} fill="#ececed" />
            <Stroke points={strokePoints} />
        </>
    );
}

export default Container2D;
