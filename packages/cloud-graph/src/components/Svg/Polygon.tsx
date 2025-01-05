import { ScreenPoint } from '@/types';

function Polygon({
    points,
    fill,
    stroke,
    strokeWidth = 1,
}: {
    points: ScreenPoint[];
    fill: string;
    stroke?: string;
    strokeWidth?: number;
}) {
    const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
    return (
        <polygon
            points={pointsStr}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
        ></polygon>
    );
}

export default Polygon;
