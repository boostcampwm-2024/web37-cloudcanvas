import useGraphStore from '@/store/useGraphStore';
import type { Dimension, ScreenPoint } from '@/types';
import { getSvgPoint, snapToGrid } from '@/utils';
import { useRef } from 'react';

type UseDragNodeProps = {
    svgRef: React.RefObject<SVGSVGElement>;
    dimension: Dimension;
};

const useDragNode = (props: UseDragNodeProps) => {
    const { svgRef, dimension } = props;

    const moveNode = useGraphStore((state) => state.moveNode);

    const draggedNodeId = useRef<string | null>(null);
    const startScreenPoint = useRef<ScreenPoint | null>(null);

    const startDragNode = (nodeId: string, point: ScreenPoint) => {
        if (!svgRef.current) return;

        draggedNodeId.current = nodeId;
        startScreenPoint.current = getSvgPoint(svgRef.current, point);
        svgRef.current.style.cursor = 'grabbing';
    };

    const dragNode = (point: ScreenPoint) => {
        if (
            !svgRef.current ||
            !draggedNodeId.current ||
            !startScreenPoint.current
        )
            return;

        const svgPoint = getSvgPoint(svgRef.current, point);

        const screenOffset = {
            x: svgPoint.x - startScreenPoint.current.x,
            y: svgPoint.y - startScreenPoint.current.y,
        };

        const offset = snapToGrid(screenOffset, dimension);
        if (!offset) return;

        moveNode(draggedNodeId.current, {
            col: offset.grid.col,
            row: offset.grid.row,
        });

        startScreenPoint.current = {
            x: startScreenPoint.current.x + offset.screen.x,
            y: startScreenPoint.current.y + offset.screen.y,
        };
    };

    const stopDragNode = () => {
        draggedNodeId.current = null;
        startScreenPoint.current = null;
        svgRef.current?.style.removeProperty('cursor');
    };

    return {
        startDragNode,
        dragNode,
        stopDragNode,
    };
};

export default useDragNode;
