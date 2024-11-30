import CloudFunctionNode from '@components/Node/ncloud/CloudFunctionNode';
import ContainerRegistryNode from '@components/Node/ncloud/ContainerRegistry';
import MySQLDBNode from '@components/Node/ncloud/MySQLDBNode';
import ObjectStorageNode from '@components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@components/Node/ncloud/ServerNode';
import useDrag from '@hooks/useDrag';
import { Node, Point } from '@types';
import { useEffect } from 'react';
import LoadBalancerNode from './ncloud/LoadBalancer';
import NatGatewayNode from './ncloud/NatGateway';

const nodeFactory = (node: Node) => {
    switch (node.type) {
        case 'server':
            return <ServerNode {...node} />;
        case 'cloud-function':
            return <CloudFunctionNode {...node} />;
        case 'object-storage':
            return <ObjectStorageNode {...node} />;
        case 'db-mysql':
            return <MySQLDBNode {...node} />;
        case 'load-balancer':
            return <LoadBalancerNode {...node} />;
        case 'object-storage':
            return <ObjectStorageNode {...node} />;
        case 'container-registry':
            return <ContainerRegistryNode {...node} />;
        case 'nat-gateway':
            return <NatGatewayNode {...node} />;
        default:
            null;
    }
};
type Props = {
    node: Node;
    isSelected: boolean;
    onMove: (id: string, newPoint: Point) => void;
    onSelect: (id: string) => void;
    onRemove: (id: string) => void;
};
export default ({ node, isSelected, onMove, onSelect, onRemove }: Props) => {
    const { id, point } = node;

    const { isDragging, startDrag, drag, stopDrag } = useDrag({
        initialPoint: point,
        updateFn: (newPoint) => onMove(id, newPoint),
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        onSelect(id);
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        drag({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        stopDrag();
        document.body.style.cursor = 'default';
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            onRemove(id);
        }
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

    useEffect(() => {
        if (isSelected) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSelected, handleKeyDown]);

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
