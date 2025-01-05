import { ScreenPoint } from '@/types';

function Stroke({
    points,
    stroke = '#000',
    strokeWidth = 2,
}: {
    points: ScreenPoint[];
    stroke?: string;
    strokeWidth?: number;
}) {
    const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
    return (
        <polygon
            points={pointsStr}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
        ></polygon>
    );
}

export default Stroke;
