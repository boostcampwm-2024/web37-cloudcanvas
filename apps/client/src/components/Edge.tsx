import { useTheme } from '@mui/material';
import { Edge, Point } from '@types';
import { useEffect } from 'react';

type Props = {
    edge: Edge;
    selectedEdge?: { id: string; segmentIdxes: number[] };
    sourceConnector: Point;
    targetConnector: Point;
    onSplit: (id: string, point: Point, bendingPoints: Point[]) => void;
    onSelectEntire: (id: string, segmentIdxes: number[]) => void;
    onSelectSegment: (id: string, bendingPoint: Point[], point: Point) => void;
    onRemove: (id: string, segmentIdxes: number[]) => void;
};

export default ({
    edge,
    selectedEdge,
    sourceConnector,
    targetConnector,
    onSplit,
    onSelectEntire,
    onSelectSegment,
    onRemove,
}: Props) => {
    const { id, type, bendingPoints } = edge;
    const theme = useTheme();

    const points = [sourceConnector, ...bendingPoints, targetConnector];
    const isSelectedEdge = selectedEdge?.id === id;

    const handleDoubleClick = () => {
        onSelectEntire(
            id,
            Array.from({ length: points.length - 1 }, (_, i) => i),
        );
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.ctrlKey) {
            const { clientX, clientY } = e;
            onSplit(edge.id, { x: clientX, y: clientY }, points);
        } else {
            const { clientX, clientY } = e;
            onSelectSegment(id, points, { x: clientX, y: clientY });
        }

        const handleMouseUp = () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (selectedEdge && e.key === 'Backspace') {
            onRemove(id, selectedEdge.segmentIdxes);
        }
    };

    useEffect(() => {
        if (isSelectedEdge) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedEdge]);

    return (
        <g
            id={id}
            data-type="edge"
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
        >
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5"
                    refX="4"
                    refY="2.5"
                    orient="auto"
                >
                    <path
                        d="M 0 0 L 5 2.5 L 0 5 Z"
                        fill={theme.palette.text.primary}
                    />
                </marker>
            </defs>
            {points.slice(0, -1).map((point, idx) => {
                const nextPoint = points[idx + 1];
                const isLastPoint = idx === points.length - 2;
                const isSelectedSegment =
                    isSelectedEdge && selectedEdge.segmentIdxes.includes(idx);

                return (
                    <line
                        key={idx}
                        x1={point.x}
                        y1={point.y}
                        x2={nextPoint.x}
                        y2={nextPoint.y}
                        stroke={
                            isSelectedSegment
                                ? theme.palette.primary.main
                                : theme.palette.text.primary
                        }
                        strokeWidth={3}
                        markerEnd={
                            type === 'arrow' && isLastPoint
                                ? 'url(#arrowhead)'
                                : ''
                        }
                        cursor="pointer"
                    />
                );
            })}
        </g>
    );
};
