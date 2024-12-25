import { ReactNode } from 'react';

export type Dimension = '2d' | '3d';

export type ScreenPosition = {
    x: number;
    y: number;
};

export type GridPosition = {
    row: number;
    col: number;
};

export type Node = {
    id: string;
    position: GridPosition;
    size: {
        cols: number;
        rows: number;
    };
    svg: ReactNode;
};

export type Edge = {
    id: string;
    type: 'line' | 'dash';
    source: {
        nodeId: string;
        type: 'none' | 'arrow';
    };
    target: {
        nodeId: string;
        type: 'none' | 'arrow';
    };
};

export type Group = {
    id: string;
    nodeIds: string[];
    childGroupIds: string[];
    parentGroupId: string;
};

export type Connection = {
    position: GridPosition;
};
