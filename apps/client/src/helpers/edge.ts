import { Connector, ConnectorMap, Dimension, Edge, Node, Point } from '@types';
import { getDistance, getDistanceToSegment } from '@utils';

export const getClosestSegEdgeIdx = (bendPoints: Point[], point: Point) => {
    let closestDistance = Infinity;
    let closestSegmentIndex = -1;

    for (let i = 0; i < bendPoints.length - 1; i++) {
        const p1 = bendPoints[i];
        const p2 = bendPoints[i + 1];
        const distance = getDistanceToSegment(point, p1, p2);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestSegmentIndex = i;
        }
    }

    if (closestSegmentIndex !== -1) {
        return closestSegmentIndex;
    }

    return bendPoints.length - 1;
};

export const findNearestConnectorPair = (
    movingConnectors: Connector[],
    connectedConnectors: Connector[],
): {
    movingConnector: Connector;
    connectedConnector: Connector;
    distance: number;
} => {
    let nearestPair: {
        movingConnector: Connector;
        connectedConnector: Connector;
        distance: number;
    } = {
        movingConnector: movingConnectors[0],
        connectedConnector: connectedConnectors[0],
        distance: Infinity,
    };

    movingConnectors.forEach((mConnector) => {
        connectedConnectors.forEach((cConnector) => {
            const distance = getDistance(mConnector.point, cConnector.point);

            if (distance < nearestPair.distance) {
                nearestPair = {
                    movingConnector: mConnector,
                    connectedConnector: cConnector,
                    distance,
                };
            }
        });
    });

    return nearestPair!;
};

const generateNodeConnectors = (connectors: ConnectorMap): Connector[] => {
    return Object.entries(connectors).map(([connectorType, point]) => ({
        type: 'node',
        connectorType: connectorType,
        point,
    }));
};

const generateBendConnector = (bendPoint: Point): Connector => {
    return {
        type: 'bend',
        point: bendPoint,
        connectorType: 'center',
    };
};

export const updateNearestConnectorPair = (
    node: Node,
    nodes: Record<string, Node>,
    edges: Edge[],
) => {
    const movingConnectors = generateNodeConnectors(node.connectors);

    const updatedConnectorPair = edges.reduce((acc, edge) => {
        const sourceIsDragging = edge.source.id === node.id;
        const connectedNodeId = sourceIsDragging
            ? edge.target.id
            : edge.source.id;

        const connectedNode = nodes[connectedNodeId];

        const connectedConnectors = generateNodeConnectors(
            connectedNode.connectors,
        );

        let updatedEdge = {};
        if (edge.bendingPoints.length > 0) {
            if (sourceIsDragging) {
                const firstBendPoint = edge.bendingPoints[0];
                const bendConnector = generateBendConnector(firstBendPoint);
                const { movingConnector } = findNearestConnectorPair(
                    movingConnectors,
                    [bendConnector],
                );
                updatedEdge = {
                    ...edge,
                    source: {
                        ...edge.source,
                        connectorType: movingConnector.connectorType,
                    },
                };
            } else {
                const lastBendPoint =
                    edge.bendingPoints[edge.bendingPoints.length - 1];
                const bendConnector = generateBendConnector(lastBendPoint);
                const { movingConnector } = findNearestConnectorPair(
                    movingConnectors,
                    [bendConnector],
                );
                updatedEdge = {
                    ...edge,
                    target: {
                        ...edge.target,
                        connectorType: movingConnector.connectorType,
                    },
                };
            }
        } else {
            const { movingConnector, connectedConnector } =
                findNearestConnectorPair(movingConnectors, connectedConnectors);
            if (sourceIsDragging) {
                updatedEdge = {
                    ...edge,
                    source: {
                        ...edge.source,
                        connectorType: movingConnector.connectorType,
                    },
                    target: {
                        ...edge.target,
                        connectorType: connectedConnector.connectorType,
                    },
                };
            } else {
                updatedEdge = {
                    ...edge,
                    target: {
                        ...edge.target,
                        connectorType: movingConnector.connectorType,
                    },
                    source: {
                        ...edge.source,
                        connectorType: connectedConnector.connectorType,
                    },
                };
            }
        }

        return {
            ...acc,
            [edge.id]: updatedEdge,
        };
    }, {});

    return updatedConnectorPair;
};

export const findNearestConnectorForBendPoint = (node: Node, point: Point) => {
    const nodeConnectors = generateNodeConnectors(node.connectors);
    const bendConnector = generateBendConnector(point);

    const connectorPair = findNearestConnectorPair(
        [bendConnector],
        nodeConnectors,
    );
    if (!connectorPair) {
        return null;
    }
    return connectorPair.connectedConnector.connectorType;
};
