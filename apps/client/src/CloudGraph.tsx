import BendingPointer from '@components/BendingPointer';
import Connection from '@components/Connection';
import Connectors from '@components/Connectors';
import Edge from '@components/Edge';
import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGraphContext } from '@contexts/GraphConetxt';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import useConnection from '@hooks/useConnection';
import useGraph from '@hooks/useGraph';
import useSelection from '@hooks/useSelection';
import { useEffect, useLayoutEffect, useRef } from 'react';

export default () => {
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { edges },
    } = useEdgeContext();
    const {
        state: { groups },
    } = useGroupContext();
    const {
        state: { viewBox },
        dispatch: graphDispatch,
    } = useGraphContext();

    const {
        selectedNodeId,
        selectedEdge,
        selectedGroupId,
        clearSelection,
        selectNode,
        selectSegEdge,
        selectEntireEdge,
    } = useSelection();

    const {
        svgRef,
        dimension,
        moveNode,
        addEdge,
        splitEdge,
        moveBendingPointer,
        getGroupBounds,
        updateNodePointForDimension,
        moveGroup,
        removeNode,
        removeEdge,
    } = useGraph();

    const {
        connection,
        isConnecting,
        openConnection,
        connectConnection,
        closeConnection,
    } = useConnection({
        updateEdgeFn: addEdge,
    });

    const nodesRef = useRef(nodes);
    const prevDimensionRef = useRef(dimension);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleMouseDown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.graph-ignore-select'))
                clearSelection();
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    useEffect(() => {
        prevDimensionRef.current = dimension;
    }, [dimension]);
    [];

    useEffect(() => {
        nodesRef.current = nodes;
    }, [nodes]);

    useLayoutEffect(() => {
        if (prevDimensionRef.current === dimension) return;
        updateNodePointForDimension(dimension);
    }, [dimension]);

    return (
        <Graph>
            <GridBackground />
            {Object.values(groups).map((group) => (
                <Group
                    key={group.id}
                    group={group}
                    bounds={getGroupBounds(group.id)}
                    onMove={moveGroup}
                />
            ))}
            {Object.values(nodes).map((node) => (
                <g key={node.id}>
                    <Node
                        node={node}
                        isSelected={selectedNodeId === node.id}
                        onMove={moveNode}
                        onSelect={selectNode}
                        onRemove={removeNode}
                    />
                    <Connectors
                        node={node}
                        isSelected={selectedNodeId === node.id}
                        isConnecting={isConnecting}
                        onOpenConnection={openConnection}
                        onConnectConnection={connectConnection}
                        onCloseConnection={closeConnection}
                    />
                </g>
            ))}
            {connection && (
                <Connection
                    source={connection.source}
                    target={connection.target}
                />
            )}

            {edges &&
                Object.values(edges).map((edge) => (
                    <g key={edge.id}>
                        <Edge
                            edge={edge}
                            selectedEdge={selectedEdge}
                            sourceConnector={
                                nodes[edge.source.id].connectors[
                                    edge.source.connectorType
                                ]
                            }
                            targetConnector={
                                nodes[edge.target.id].connectors[
                                    edge.target.connectorType
                                ]
                            }
                            onSelectEntire={selectEntireEdge}
                            onSelectSegment={selectSegEdge}
                            onSplit={splitEdge}
                            onRemove={removeEdge}
                        />
                        {edge.bendingPoints.map((point, index) => (
                            <BendingPointer
                                key={`${edge.id}-${index}`}
                                edgeId={edge.id}
                                point={point}
                                index={index}
                                onMove={(newPoint) =>
                                    moveBendingPointer(edge.id, index, newPoint)
                                }
                            />
                        ))}
                    </g>
                ))}
        </Graph>
    );
};
