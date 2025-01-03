export type Dimension = '2d' | '3d';

export type ScreenPoint = {
    x: number;
    y: number;
};

export type GridPoint = {
    row: number;
    col: number;
};

export type ViewBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Node = {
    id: string;
    point: GridPoint;
    size: {
        cols: number;
        rows: number;
    };
    //eslint-disable-next-line  @typescript-eslint/no-explicit-any
    Component: React.FC<any>;
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
    point: GridPoint;
};
