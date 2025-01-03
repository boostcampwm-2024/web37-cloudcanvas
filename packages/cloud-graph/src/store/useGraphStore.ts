import { GridPoint, Node } from '@/types';
import { lazy } from 'react';
import { create } from 'zustand';

type GraphStoreState = {
    selectedId: string | null;
    nodes: Record<string, Node>;
};

type GraphStoreAction = {
    moveNode: (nodeId: string, offset: GridPoint) => void;
    select: (nodeId: string) => void;
    deselect: () => void;
};

const node1 = {
    id: 'a1',
    point: { col: 0, row: 0 },
    size: { cols: 1, rows: 1 },
    Component: lazy(() => import('@/components/Node/common/Rect')),
};
const node2 = {
    id: 'a2',
    point: { col: 1, row: 0 },
    size: { cols: 1, rows: 1 },
    Component: lazy(() => import('@/components/Node/common/Rect')),
};
const server = {
    id: 'server1',
    point: { col: 1, row: 1 },
    size: { cols: 1, rows: 1 },
    Component: lazy(() => import('@/components/Node/common/Box')),
};

const storage = {
    id: 'storage1',
    point: { col: 1, row: 2 },
    size: { cols: 1, rows: 1 },
    Component: lazy(() => import('@/components/Node/cloud/Storage')),
};

const nodes = [node1, node2, server, storage];

const useGraphStore = create<GraphStoreState & GraphStoreAction>((set) => ({
    selectedId: null,
    nodes: nodes.reduce((acc, node) => {
        return {
            ...acc,
            [node.id]: node,
        };
    }, {}),
    moveNode: (nodeId, offset) =>
        set((state) => {
            const draggedNode = state.nodes[nodeId];
            const updatedPoint = {
                row: draggedNode.point.row + offset.row,
                col: draggedNode.point.col + offset.col,
            };
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [nodeId]: {
                        ...draggedNode,
                        point: updatedPoint,
                    },
                },
            };
        }),
    select: (nodeId) => set(() => ({ selectedId: nodeId })),
    deselect: () => set(() => ({ selectedId: null })),
}));

export default useGraphStore;
