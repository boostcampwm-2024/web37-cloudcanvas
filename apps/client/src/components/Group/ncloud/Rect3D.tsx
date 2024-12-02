import { Bounds } from '@types';
import { screenToGrid2d, gridToScreen3d } from '@utils';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    bounds: Bounds;
    color: string;
    [key: string]: any;
};
export default ({ bounds, properties, color, children }: Props) => {
    const topLeftGrid = screenToGrid2d({ x: 0, y: 0 });
    const topRightGrid = screenToGrid2d({ x: bounds.width, y: 0 });
    const bottomRightGrid = screenToGrid2d({
        x: bounds.width,
        y: bounds.height,
    });
    const bottomLeftGrid = screenToGrid2d({ x: 0, y: bounds.height });

    const point1 = gridToScreen3d({
        col: topLeftGrid.col,
        row: topLeftGrid.row,
    });
    const point2 = gridToScreen3d({
        col: topRightGrid.col,
        row: topRightGrid.row,
    });
    const point3 = gridToScreen3d({
        col: bottomRightGrid.col,
        row: bottomRightGrid.row,
    });
    const point4 = gridToScreen3d({
        col: bottomLeftGrid.col,
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
            {children}
        </>
    );
};
