import { useSvgContext } from '@contexts/SvgContext';
import { Point } from '@types';
import { getSvgPoint } from '@utils';
import { useState } from 'react';

type Props = {
    initialPoint: Point;
    updateFn: (point: Point) => void;
};

export default ({ initialPoint, updateFn }: Props) => {
    const { svgRef } = useSvgContext();
    const [isDragging, setIsDragging] = useState(false);
    const [startDragPoint, setStartDragPoint] = useState<Point | null>(null);

    const startDrag = (point: Point) => {
        if (!svgRef.current) return;

        setIsDragging(true);
        const startSvgPoint = getSvgPoint(svgRef.current, point);
        setStartDragPoint(startSvgPoint);
    };

    const drag = (point: Point) => {
        if (!(isDragging && startDragPoint && svgRef.current)) return;

        const curSvgPoint = getSvgPoint(svgRef.current, point);
        const offset = {
            x: curSvgPoint.x - startDragPoint.x,
            y: curSvgPoint.y - startDragPoint.y,
        };

        if (Math.abs(offset.x) <= 22.5 && Math.abs(offset.y) <= 22.5) return;

        updateFn({
            x: initialPoint.x + offset.x,
            y: initialPoint.y + offset.y,
        });
    };

    const stopDrag = () => {
        setIsDragging(false);
        setStartDragPoint(null);
    };

    return {
        isDragging,
        startDrag,
        drag,
        stopDrag,
    };
};
