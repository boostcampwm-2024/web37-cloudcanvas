import Text from '@components/Group/ncloud/Title';
import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds, Group } from '@types';
import { generateRandomRGB } from '@utils';
import { useMemo } from 'react';

interface Props extends Partial<Group> {
    color: string;
    bounds: Bounds;
}

const Rect3D = ({ bounds, properties, color }: Props) => {
    const transform = 'matrix(0.707 0.409 -0.707 0.409 0 0)';
    const points = `90 0, 90 ${bounds.height}, ${bounds.width + 90} ${bounds.height}, ${bounds.width + 90} 0`;

    return (
        <>
            <polygon
                points={points}
                stroke={color}
                strokeWidth="8"
                fill="none"
                transform={transform}
            ></polygon>
            <Text bounds={bounds} color={color} text={properties?.name} />
        </>
    );
};

const Rect2D = ({ bounds, color, properties }: Props) => {
    const points = `0 0, 0 ${bounds.height}, ${bounds.width} ${bounds.height}, ${bounds.width} 0`;

    return (
        <>
            <polygon
                points={points}
                stroke={color}
                strokeWidth="8"
                fill="none"
            ></polygon>
            <Text bounds={bounds} color={color} text={properties?.name} />
        </>
    );
};

export default ({ bounds, properties }: Omit<Props, 'color'>) => {
    const { dimension } = useDimensionContext();
    const color = useMemo(() => generateRandomRGB(), []);

    return dimension === '2d' ? (
        <Rect2D bounds={bounds} properties={properties} color={color} />
    ) : (
        <Rect3D bounds={bounds} properties={properties} color={color} />
    );
};
