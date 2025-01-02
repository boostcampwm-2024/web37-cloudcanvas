import useZoomPan from '@/hooks/useZoomPan';
import useSvgStore from '@/store/useSvgStore';
import { PropsWithChildren, useRef } from 'react';

function Graph({ children }: PropsWithChildren) {
    const { viewBox, setViewBox } = useSvgStore();
    const svgRef = useRef<SVGSVGElement>(null);
    const { zoom, startPan, movePan, stopPan } = useZoomPan({
        svgRef,
        viewBox,
        setViewBox,
    });

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        const { clientX, clientY } = e;
        startPan({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const { clientX, clientY } = e;
        movePan({ x: clientX, y: clientY });
    };

    const handleMouseUp = () => {
        stopPan();
    };

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        const { deltaY, clientX, clientY } = e;
        zoom(deltaY, { x: clientX, y: clientY });
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
