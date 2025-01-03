import type { Dimension, Node as NodeType, ScreenPoint } from '@/types';
import { gridToScreen2d, gridToScreen3d } from '@/utils';
import { useMemo } from 'react';

type NodeProps = {
    node: NodeType;
    dimension: Dimension;
    isSelected: boolean;
    onSelect: (nodeId: string) => void;
    onDeselect: () => void;
    onStartDragNode: (nodeId: string, point: ScreenPoint) => void;
};

function Node(props: NodeProps) {
    const {
        node: { Component, ...node },
        dimension,
        isSelected,
        onSelect,
        onDeselect,
        onStartDragNode,
    } = props;

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isSelected) {
            onDeselect();
        } else {
            onSelect(node.id);
        }

        const { clientX, clientY } = e;
        onStartDragNode(node.id, { x: clientX, y: clientY });
    };

    const transform = useMemo(() => {
        const screenPoint =
            dimension === '3d'
                ? gridToScreen3d(node.point)
                : gridToScreen2d(node.point);
        return `translate(${screenPoint.x}, ${screenPoint.y})`;
    }, [node.point, dimension]);

    return (
        <g id="node" transform={transform} onMouseDown={handleMouseDown}>
            <Component
                dimension={dimension}
                fill="red"
                width="90"
                height="90"
            />
        </g>
    );
}

export default Node;
