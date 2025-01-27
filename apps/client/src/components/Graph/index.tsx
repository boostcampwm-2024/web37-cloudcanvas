import { useGraphContext } from '@contexts/GraphConetxt';
import { useSvgContext } from '@contexts/SvgContext';
import useKey from '@hooks/useKey';
import { Point } from '@types';
import { getSvgPoint } from '@utils';
import { PropsWithChildren, useRef, useEffect } from 'react';

export default ({ children }: PropsWithChildren) => {
    const { svgRef } = useSvgContext();
    const {
        state: { viewBox, initialViewBox },
        dispatch,
    } = useGraphContext();

    const isPanning = useRef(false);
    const startPoint = useRef<Point>({ x: 0, y: 0 });
    const spaceActiveKey = useKey('space');

    const MIN_ZOOM = 0.1;
    const MAX_ZOOM = 3;

    const zoomEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleZoomEnd = () => {
        document.body.style.cursor = 'default';
    };

    const zoom = (wheelY: number, point: Point) => {
        if (!svgRef.current) return;

        const zoomFactor = wheelY > 0 ? 1.1 : 0.9;
        const cursorSvgPoint = getSvgPoint(svgRef.current, point);
        if (!cursorSvgPoint) return;

        const currentZoom = initialViewBox.width / viewBox.width;
        const newZoom = currentZoom * (1 / zoomFactor);

        if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
            return;
        }

        dispatch({
            type: 'SET_VIEWBOX',
            payload: {
                x:
                    viewBox.x +
                    (cursorSvgPoint.x - viewBox.x) * (1 - zoomFactor),
                y:
                    viewBox.y +
                    (cursorSvgPoint.y - viewBox.y) * (1 - zoomFactor),
                width: viewBox.width * zoomFactor,
                height: viewBox.height * zoomFactor,
            },
        });
    };

    const startPan = (point: Point) => {
        isPanning.current = true;
        startPoint.current = point;
    };

    const movePan = (point: Point) => {
        if (!isPanning.current || !svgRef.current) return;

        const svg = svgRef.current;
        const dx =
            (startPoint.current.x - point.x) *
            (viewBox.width / svg.clientWidth);
        const dy =
            (startPoint.current.y - point.y) *
            (viewBox.height / svg.clientHeight);
        startPoint.current = point;

        dispatch({
            type: 'SET_VIEWBOX',
            payload: {
                x: viewBox.x + dx,
                y: viewBox.y + dy,
                width: viewBox.width,
                height: viewBox.height,
            },
        });
    };

    const stopPan = () => (isPanning.current = false);

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        const { deltaY, clientX, clientY } = e;
        zoom(deltaY, { x: clientX, y: clientY });
        if (deltaY > 0) {
            document.body.style.cursor = 'zoom-out';
        } else {
            document.body.style.cursor = 'zoom-in';
        }

        if (zoomEndTimer.current) {
            clearTimeout(zoomEndTimer.current);
        }

        zoomEndTimer.current = setTimeout(() => {
            handleZoomEnd();
            zoomEndTimer.current = null;
        }, 200);
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!spaceActiveKey) return;
        const { clientX, clientY } = e;
        startPan({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!isPanning.current) return;
        const { clientX, clientY } = e;
        movePan({ x: clientX, y: clientY });
        document.body.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
        stopPan();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        return () => {
            if (zoomEndTimer.current) {
                clearTimeout(zoomEndTimer.current);
            }
        };
    }, []);

    return (
        <svg
            id="cloud-graph"
            ref={svgRef}
            viewBox={`${viewBox?.x} ${viewBox?.y} ${viewBox?.width} ${viewBox?.height}`}
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            height="100%"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children}
        </svg>
    );
};
