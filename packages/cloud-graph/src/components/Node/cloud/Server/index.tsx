import type { Dimension, GridSize, Node, ScreenPoint } from '@/types';
import { gridToScreen } from '@/utils';
import Server2D from './Server2D';
import Server3D from './Server3D';

export type ServerProps = {
    node: Node;
    dimension: Dimension;
    isSelected: boolean;
    onSelect: (nodeId: string) => void;
    onStartDrag: (nodeId: string, point: ScreenPoint) => void;
};

function Server(props: ServerProps) {
    const { dimension, node, onSelect, onStartDrag } = props;

    const screenPoint = gridToScreen(node.point, dimension);
    const transform = `translate(${screenPoint.x}, ${screenPoint.y})`;

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();

        onSelect(node.id);

        const { clientX, clientY } = e;
        onStartDrag(node.id, { x: clientX, y: clientY });
    };

    return (
        <g transform={transform} onMouseDown={handleMouseDown}>
            {dimension === '3d' ? (
                <Server3D size={node.size[dimension] as Required<GridSize>} />
            ) : (
                <Server2D size={node.size[dimension]} />
            )}
        </g>
    );
}

export default Server;
