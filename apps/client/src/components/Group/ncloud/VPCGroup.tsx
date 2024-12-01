import Text from '@components/Group/ncloud/Title';
import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds, Group } from '@types';
import { calcIsoMatrixPoint, generateRandomRGB } from '@utils';
import { useMemo } from 'react';
import Rect3D from './Rect3D';

interface Props extends Partial<Group> {
    color: string;
    bounds: Bounds;
}

const VPC3D = ({ bounds, properties, color }: Props) => {
    return (
        <Rect3D bounds={bounds} properties={properties} color={color}>
            <Text bounds={bounds} color={color} text={properties?.name} />
        </Rect3D>
    );
};

const VPC2D = ({ bounds, color, properties }: Props) => {
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
        <VPC2D bounds={bounds} properties={properties} color={color} />
    ) : (
        <VPC3D bounds={bounds} properties={properties} color={color} />
    );
};
