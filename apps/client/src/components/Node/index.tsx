import CloudFunctionNode from '@components/Node/ncloud/CloudFunctionNode';
import DBMySQLNode from '@components/Node/ncloud/DBMySQLNode';
import ObjectStorageNode from '@components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@components/Node/ncloud/ServerNode';
import useDrag from '@hooks/useDrag';
import useGraphActions from '@hooks/useGraphActions';
import { Node } from '@types';
import { useEffect } from 'react';

const nodeFactory = (node: Node) => {
    switch (node.type) {
        case 'server':
            return <ServerNode {...node} />;
        case 'cloud-function':
            return <CloudFunctionNode {...node} />;
        case 'object-storage':
            return <ObjectStorageNode {...node} />;
        case 'db-mysql':
            return <DBMySQLNode {...node} />;
        // case 'pointer':
        //     return <PointerNode />;
        default:
            null;
    }
};
type Props = {
    node: Node;
};
export default ({ node }: Props) => {
    const { id, type, point } = node;
    // const { dispatch } = useCanvasInstanceContext();
    const { dragNode } = useGraphActions();
    const { isDragging, startDrag, drag, stopDrag } = useDrag({
        initialPoint: point,
        updateFn: (newPoint) => dragNode(id, newPoint),
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        drag({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        stopDrag();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <g
            id={id}
            transform={`translate(${point.x}, ${point.y})`}
            onMouseDown={handleMouseDown}
        >
            {nodeFactory(node)}
        </g>
    );
};
