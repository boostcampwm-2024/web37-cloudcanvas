import Graph from '@/components/Graph';
import GridBackground from '@/components/GridBackground';
import { Suspense, useRef } from 'react';
import useDragNode from './hooks/useDrag';
import useZoomPan from './hooks/useZoomPan';
import useGraphStore from './store/useGraphStore';
import useSvgStore from './store/useSvgStore';

function App() {
    const svgRef = useRef<SVGSVGElement>(null);

    const viewBox = useSvgStore((state) => state.viewBox);
    const dimension = useSvgStore((state) => state.dimension);
    const setViewBox = useSvgStore((state) => state.setViewBox);

    const nodes = useGraphStore((state) => state.nodes);
    const selectedId = useGraphStore((state) => state.selectedId);
    const handleDeselect = useGraphStore((state) => state.deselect);
    const handleSelect = useGraphStore((state) => state.select);

    const {
        zoom: handleZoom,
        startPan: handleStartPan,
        movePan: handleMovePan,
        stopPan: handleStopPan,
    } = useZoomPan({
        svgRef,
        viewBox,
        setViewBox,
    });

    const {
        startDragNode: handleStartDragNode,
        dragNode: handleDragNode,
        stopDragNode: handleStopDragNode,
    } = useDragNode({
        svgRef,
        dimension,
    });

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Graph
                ref={svgRef}
                viewBox={viewBox}
                onZoom={handleZoom}
                onStartPan={handleStartPan}
                onMovePan={handleMovePan}
                onStopPan={handleStopPan}
                onDeselect={handleDeselect}
                onDragNode={handleDragNode}
                onStopDragNode={handleStopDragNode}
            >
                <GridBackground viewBox={viewBox} dimension={dimension} />
                {Object.values(nodes).map((node) => {
                    const { Component, ...restNode } = node;
                    return (
                        <Suspense fallback={null} key={node.id}>
                            <Component
                                key={node.id}
                                node={restNode}
                                dimension={dimension}
                                isSelected={selectedId === node.id}
                                onSelect={handleSelect}
                                onDeselect={handleDeselect}
                                onStartDrag={handleStartDragNode}
                            />
                        </Suspense>
                    );
                })}
            </Graph>
        </div>
    );
}

export default App;
