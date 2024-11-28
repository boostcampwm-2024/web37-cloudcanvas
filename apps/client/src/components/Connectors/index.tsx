import Connector from '@components/Connectors/Connector';
import { Connection, Node, Point } from '@types';
import { useEffect } from 'react';

type Props = {
    node: Node;
    isSelected: boolean;
    isConnecting: boolean;
    onOpenConnection: (from: Connection) => void;
    onConnectConnection: (point: Point) => void;
    onCloseConnection: () => void;
};

export default ({
    node,
    isSelected,
    isConnecting,
    onOpenConnection,
    onConnectConnection,
    onCloseConnection,
}: Props) => {
    const handleMouseDown = (
        e: React.MouseEvent,
        connectorType: string,
        point: Point,
    ) => {
        e.stopPropagation();
        onOpenConnection({
            id: node.id,
            connectorType,
            point,
        });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        onConnectConnection({ x: clientX, y: clientY });
    };

    const handleCloseConnection = () => {
        onCloseConnection();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isConnecting) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleCloseConnection);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleCloseConnection);
        };
    }, [isConnecting]);

    return (
        <>
            {Object.entries(node.connectors).map(([type, point]) => (
                <Connector
                    key={`${node.id}-${type}`}
                    point={point}
                    visible={isSelected}
                    onMouseDown={(e) => handleMouseDown(e, type, point)}
                />
            ))}
        </>
    );
};
