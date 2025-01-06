import { MAX_SCALE, MIN_SCALE } from '@/constants';
import { ScreenPoint, ViewBox } from '@/types';
import { getSvgPoint } from '@/utils';
import { useRef } from 'react';

type UseZoomPanProps = {
    svgRef: React.RefObject<SVGSVGElement>;
    viewBox: ViewBox;
    setViewBox: (viewBox: ViewBox) => void;
};

//TODO: Re-Rendering시 currentZoom 동기화 해줘야함
const useZoomPan = ({ svgRef, viewBox, setViewBox }: UseZoomPanProps) => {
    const currentZoomRef = useRef(1);
    const isPanning = useRef(false);
    const startPoint = useRef<ScreenPoint>({ x: 0, y: 0 });

    const zoom = (wheelY: number, point: ScreenPoint) => {
        if (!svgRef.current) throw new Error('useZoomPan: SVG ref is not set');

        const zoomFactor = wheelY > 0 ? 1.1 : 0.9;
        const cursorSvgPoint = getSvgPoint(svgRef.current, point);

        const nextZoomFactor = currentZoomRef.current * zoomFactor;
        if (nextZoomFactor > MAX_SCALE || nextZoomFactor < MIN_SCALE) return;
        currentZoomRef.current = nextZoomFactor;

        setViewBox({
            x: viewBox.x + (cursorSvgPoint.x - viewBox.x) * (1 - zoomFactor),
            y: viewBox.y + (cursorSvgPoint.y - viewBox.y) * (1 - zoomFactor),
            width: viewBox.width * zoomFactor,
            height: viewBox.height * zoomFactor,
        });

        if (wheelY > 0) {
            svgRef.current.style.cursor = 'zoom-out';
        } else {
            svgRef.current.style.cursor = 'zoom-in';
        }

        setTimeout(() => (svgRef.current!.style.cursor = 'default'), 100);
    };

    const startPan = (point: ScreenPoint) => {
        if (!svgRef.current) throw new Error('useZoomPan: SVG ref is not set');

        isPanning.current = true;
        startPoint.current = getSvgPoint(svgRef.current, point);
        svgRef.current.style.cursor = 'grabbing';
    };

    const movePan = (point: ScreenPoint) => {
        if (!svgRef.current)
            throw new Error('useZoomPan: Not panning or SVG ref is not set');
        if (!isPanning.current) return;

        const svgPoint = getSvgPoint(svgRef.current, point);
        const dx = startPoint.current.x - svgPoint.x;
        const dy = startPoint.current.y - svgPoint.y;

        setViewBox({
            x: viewBox.x + dx,
            y: viewBox.y + dy,
            width: viewBox.width,
            height: viewBox.height,
        });
    };

    const stopPan = () => {
        isPanning.current = false;
        svgRef.current!.style.cursor = 'default';
    };

    return {
        zoom,
        startPan,
        movePan,
        stopPan,
    };
};

export default useZoomPan;
