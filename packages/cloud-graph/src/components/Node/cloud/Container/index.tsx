import type { Dimension, GridSize, Node, ScreenPoint } from '@/types';
import Container3D from './Container3D';
import Container2D from './Container2D';
import { gridToScreen } from '@/utils';

export type ContainerProps = {
    node: Node;
    dimension: Dimension;
    isSelected: boolean;
    onSelect: (nodeId: string) => void;
    onDeselect: () => void;
    onStartDrag: (nodeId: string, point: ScreenPoint) => void;
};

function Container(props: ContainerProps) {
    const { dimension, node, isSelected, onSelect, onDeselect, onStartDrag } =
        props;

    const screenPoint = gridToScreen(node.point, dimension);
    const transform = `translate(${screenPoint.x}, ${screenPoint.y})`;

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isSelected) {
            onDeselect();
        } else {
            onSelect(node.id);
        }

        const { clientX, clientY } = e;
        onStartDrag(node.id, { x: clientX, y: clientY });
    };

    return (
        <g transform={transform} onMouseDown={handleMouseDown}>
            {dimension === '3d' ? (
                <Container3D
                    size={node.size[dimension] as Required<GridSize>}
                />
            ) : (
                <Container2D size={node.size[dimension]} />
            )}
        </g>
    );
}

export default Container;
