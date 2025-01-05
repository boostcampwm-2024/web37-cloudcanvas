import Block, { calculateBlockPoints } from '@/components/Svg/Block';
import Stroke from '@/components/Svg/Stroke';
import { GridSize } from '@/types';

type Server3DProps = {
    size: Required<GridSize>;
};

function Server3D(props: Server3DProps) {
    const { size } = props;

    //INFO: 하단 파란색 표면 포인트 계산
    const { depth } = size as Required<GridSize>;
    const points = calculateBlockPoints(size as Required<GridSize>);

    const strokePoints = [
        points[0],
        points[1],
        { x: points[1].x, y: points[1].y + depth },
        { x: points[2].x, y: points[2].y + depth },
        { x: points[3].x, y: points[3].y + depth },
        { x: points[3].x, y: points[3].y },
    ];

    return (
        <Block size={size as Required<GridSize>}>
            <Stroke points={strokePoints} />
        </Block>
    );
}

export default Server3D;
