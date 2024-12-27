import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from '@/constants';
import useSvgStore from '@/store/useSvgStore';
import { ScreenPosition } from '@/types';
import { PropsWithChildren, useRef, useState } from 'react';

function Graph({ children }: PropsWithChildren) {
    const { viewBox, svgRef, setViewBox } = useSvgStore();

    const transform = useRef<{
        x: number;
        y: number;
        scale: number;
    }>({
        x: 0,
        y: 0,
        scale: 1,
    });
    const [isDragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState<ScreenPosition>({ x: 0, y: 0 });

    const updateViewBox = ({ x, y, scale }: typeof transform.current) => {
        const { clientWidth, clientHeight } = svgRef.current!;

        setViewBox({
            x: -x / scale,
            y: -y / scale,
            width: clientWidth / scale,
            height: clientHeight / scale,
        });
        transform.current = {
            x,
            y,
            scale,
        };
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        svgRef.current?.style.setProperty('cursor', 'grabbing');
        setDragging(true);
        setDragStart({
            x: e.clientX - transform.current.x,
            y: e.clientY - transform.current.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isDragging) return;

        updateViewBox({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
            scale: transform.current.scale,
        });
    };

    const handleMouseUp = () => {
        svgRef.current?.style.setProperty('cursor', 'default');
        setDragging(false);
    };

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        if (!svgRef.current) return;

        const { x, y, scale } = transform.current;

        const scaleFactor = e.deltaY > 0 ? 1 - SCALE_STEP : 1 + SCALE_STEP;
        const newScale = scale * scaleFactor;
        if (newScale < MIN_SCALE || newScale > MAX_SCALE) return;

        const { clientLeft, clientTop } = svgRef.current!;
        const offsetX = e.clientX - clientLeft;
        const offsetY = e.clientY - clientTop;

        const newX = offsetX - (offsetX - x) * scaleFactor;
        const newY = offsetY - (offsetY - y) * scaleFactor;

        updateViewBox({ x: newX, y: newY, scale: newScale });
    };

    return (
        <svg
            ref={svgRef}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
        >
            {children}
        </svg>
    );
}

export default Graph;
