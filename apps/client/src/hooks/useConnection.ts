import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import { Connection, Node, Point } from '@types';
import { getDistance, getSvgPoint } from '@utils';
import { useRef, useState } from 'react';

type Props = {
    updateEdgeFn: (source: Connection, target: Connection) => void;
};

export default ({ updateEdgeFn }: Props) => {
    const { svgRef } = useSvgContext();
    const {
        state: { nodes },
    } = useNodeContext();

    const [isConnecting, setIsConnecting] = useState(false);
    const [connection, setConnection] = useState<{
        source: Point;
        target: Point;
    } | null>(null);

    const sourceRef = useRef<Connection | null>(null);
    const targetRef = useRef<Connection | null>(null);

    const getNearestConnector = (nodes: Node[], point: Point) => {
        let minDistance = Infinity;
        let newPoint = point;
        let target = {
            id: '',
            connectorType: '',
        };

        nodes.forEach((node) => {
            Object.entries(node.connectors).forEach(
                ([connectorType, connectorPoint]) => {
                    const distance = getDistance(point, connectorPoint);
                    const threshold = 30;
                    if (distance < threshold && distance < minDistance) {
                        target = {
                            id: node.id,
                            connectorType,
                        };
                        newPoint = connectorPoint;
                        minDistance = distance;
                    }
                },
            );
        });

        return { target, point: newPoint };
    };

    const openConnection = (from: Connection) => {
        if (!svgRef.current) return;

        setConnection({
            source: from.point,
            target: from.point,
        });

        sourceRef.current = from;
        setIsConnecting(true);
    };

    const connectConnection = (point: Point) => {
        if (!isConnecting || !svgRef.current) return;
        const svgPoint = getSvgPoint(svgRef.current, point);

        const { target, point: newPoint } = getNearestConnector(
            Object.values(nodes),
            svgPoint,
        );

        setConnection((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                target: newPoint,
            };
        });

        if (target.id) {
            targetRef.current = {
                ...target,
                point: newPoint,
            };
        }
    };

    const closeConnection = () => {
        setIsConnecting(false);
        setConnection(null);
        if (
            sourceRef.current &&
            targetRef.current &&
            targetRef.current.id !== sourceRef.current.id
        ) {
            updateEdgeFn(sourceRef.current, targetRef.current);
        }
        targetRef.current = null;
    };

    return {
        connection,
        isConnecting,
        openConnection,
        connectConnection,
        closeConnection,
    };
};
