import { ScreenPoint } from '@/types';
import { forwardRef } from 'react';

interface GraphProps extends Omit<React.ComponentProps<'svg'>, 'viewBox'> {
    viewBox: { x: number; y: number; width: number; height: number };
    onZoom: (wheelY: number, point: ScreenPoint) => void;
    onStartPan: (point: ScreenPoint) => void;
    onMovePan: (point: ScreenPoint) => void;
    onStopPan: () => void;
    onDragNode: (point: ScreenPoint) => void;
    onStopDragNode: () => void;
    onDeselect: () => void;
}

const Graph = forwardRef<SVGSVGElement, GraphProps>(function (props, ref) {
    const {
        viewBox,
        children,
        onZoom,
        onStartPan,
        onStopPan,
        onMovePan,
        onDragNode,
        onStopDragNode,
        onDeselect,
        ...svgProps
    } = props;

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
        onDeselect();
        const { clientX, clientY } = e;
        onStartPan({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const { clientX, clientY } = e;
        onMovePan({ x: clientX, y: clientY });
        onDragNode({ x: clientX, y: clientY });
    };

    const handleMouseUp = () => {
        onStopPan();
        onStopDragNode();
    };

    const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
        const { deltaY, clientX, clientY } = e;
        onZoom(deltaY, { x: clientX, y: clientY });
    };
    return (
        <svg
            id="graph"
            ref={ref}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            {...svgProps}
        >
            {children}
        </svg>
    );
});

export default Graph;
