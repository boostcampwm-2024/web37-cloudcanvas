import Block, { calculateBlockPoints } from '@/components/Svg/Block';
import Polygon from '@/components/Svg/Polygon';
import Stroke from '@/components/Svg/Stroke';
import { GridSize } from '@/types';

type Container3DProps = {
    size: Required<GridSize>;
};

function Container3D(props: Container3DProps) {
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
            <Polygon
                points={[
                    { x: points[3].x, y: points[3].y + depth / 2 },
                    { x: points[2].x, y: points[2].y + depth / 2 },
                    { x: points[2].x, y: points[2].y + depth },
                    { x: points[3].x, y: points[3].y + depth },
                ]}
                fill="#326ca2"
                stroke="#83838a"
            />
            <Polygon
                points={[
                    { x: points[2].x, y: points[2].y + depth / 2 },
                    { x: points[1].x, y: points[1].y + depth / 2 },
                    { x: points[1].x, y: points[1].y + depth },
                    { x: points[2].x, y: points[2].y + depth },
                ]}
                fill="#326ca2"
                stroke="#83838a"
            />
            <Stroke points={strokePoints} />
        </Block>
    );
}

export default Container3D;
