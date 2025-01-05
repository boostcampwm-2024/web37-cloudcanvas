import { ScreenPoint } from '@/types';

interface PolygonProps extends Omit<React.ComponentProps<'polygon'>, 'points'> {
    points: ScreenPoint[];
}

function Polygon(props: PolygonProps) {
    const { points, ...restProps } = props;
    const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');

    return <polygon points={pointsStr} {...restProps}></polygon>;
}

export default Polygon;
