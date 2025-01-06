import { GRID_HEIGHT_3D } from '@/constants';
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

const server = {
    id: 'server1',
    point: { col: 0, row: 0 },
    size: {
        '2d': {
            cols: 1,
            rows: 1,
        },
        '3d': {
            cols: 1,
            rows: 1,
            depth: GRID_HEIGHT_3D / 2,
        },
    },
    Component: lazy(() => import('@/components/Node/cloud/Server')),
    connectors: [
        { col: 0.5, row: 0 }, // right
        { col: 0, row: 0.5 }, // bottom
        { col: -0.5, row: 0 }, //left
        { col: 0, row: -0.5 }, //top
    ],
};

const storage = {
    id: 'storage1',
    point: { col: 1, row: 2 },
    size: {
        '2d': {
            cols: 1,
            rows: 1,
        },
        '3d': {
            cols: 1,
            rows: 1,
        },
    },
    Component: lazy(() => import('@/components/Node/cloud/Storage')),
    connectors: [
        { col: 0.2, row: 0 }, // right
        { col: 0, row: 0.2 }, // bottom
        { col: -0.2, row: 0 }, //left
        { col: 0, row: -0.2 }, //top
    ],
};

const container = {
    id: 'container1',
    point: { col: 5, row: 5 },
    size: {
        '2d': {
            cols: 4,
            rows: 4,
        },
        '3d': {
            cols: 4,
            rows: 4,
            depth: GRID_HEIGHT_3D / 4,
        },
    },
    Component: lazy(
        () => import('@/components/Node/cloud/Container/index.tsx'),
    ),
    connectors: [
        { col: 2, row: 0 }, // right
        { col: 0, row: 2 }, // bottom
        { col: -2, row: 0 }, //left
        { col: 0, row: -2 }, //top
    ],
};
const nodes = [server, container];

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
