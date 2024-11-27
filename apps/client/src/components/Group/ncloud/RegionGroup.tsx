import Text from '@components/Group/ncloud/Title';
import { useDimensionContext } from '@contexts/DimensionContext';
import { Bounds, Group } from '@types';
import { generateRandomRGB, gridToScreen3d, screenToGrid2d } from '@utils';
import { useMemo } from 'react';

interface Props extends Partial<Group> {
    color: string;
    bounds: Bounds;
}

const Region3D = ({ bounds, name, color }: Props) => {
    const topLeftGrid = screenToGrid2d({ x: 0, y: 0 });
    const topRightGrid = screenToGrid2d({ x: bounds.width, y: 0 });
    const bottomRightGrid = screenToGrid2d({
        x: bounds.width,
        y: bounds.height,
    });
    const bottomLeftGrid = screenToGrid2d({ x: 0, y: bounds.height });

    const point1 = gridToScreen3d({
        col: topLeftGrid.col + 1,
        row: topLeftGrid.row,
    });
    const point2 = gridToScreen3d({
        col: topRightGrid.col + 1,
        row: topRightGrid.row,
    });
    const point3 = gridToScreen3d({
        col: bottomRightGrid.col + 1,
        row: bottomRightGrid.row,
    });
    const point4 = gridToScreen3d({
        col: bottomLeftGrid.col + 1,
        row: bottomLeftGrid.row,
    });

    const points = `
        ${point1.x} ${point1.y}, 
        ${point2.x} ${point2.y}, 
        ${point3.x} ${point3.y}, 
        ${point4.x} ${point4.y}
    `;

    return (
        <>
            <polygon
                points={points}
                stroke={color}
                strokeWidth="8"
                fill="none"
            ></polygon>
            <Text bounds={bounds} color={color} text={name} />
        </>
    );
};

const Region2D = ({ bounds, color, name }: Props) => {
    const points = `0 0, 0 ${bounds.height}, ${bounds.width} ${bounds.height}, ${bounds.width} 0`;

    return (
        <>
            <polygon
                points={points}
                stroke={color}
                strokeWidth="8"
                fill="none"
            ></polygon>
            <Text bounds={bounds} color={color} text={name} />
        </>
    );
};

export default ({ bounds, name }: Pick<Props, 'bounds' | 'name'>) => {
    const { dimension } = useDimensionContext();
    const color = useMemo(() => generateRandomRGB(), []);

    return dimension === '2d' ? (
        <Region2D bounds={bounds} name={name} color={color} />
    ) : (
        <Region3D bounds={bounds} name={name} color={color} />
    );
};
