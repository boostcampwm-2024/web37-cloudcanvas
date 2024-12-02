export type Dimension = '2d' | '3d';

export type Point = { x: number; y: number };

export type GridPoint = { col: number; row: number };

export type Size = {
    width: number;
    height: number;
};

export type Size3D = {
    depth: number;
    offset: number;
} & Size;

export type ViewBox = Point & Size;

export type Bounds = Point & Size;

export type Node = {
    id: string;
    type: string;
    point: Point;
    size: {
        '2d': Size;
        '3d': Size3D;
    };
    properties: { [id: string]: any };
    connectors: { [key: string]: Point };
};

export type Edge = {
    id: string;
    type: 'arrow' | 'line';
    source: {
        id: string;
        connectorType: string;
    };
    target: {
        id: string;
        connectorType: string;
    };
    bendingPoints: Point[];
};

export type Group = {
    id: string;
    type: string;
    nodeIds: string[];
    properties: { [id: string]: any };
    childGroupIds: string[];
    parentGroupId: string;
};

export type Connection = {
    id: string;
    point: Point;
    connectorType: string;
};

export type ConnectorType = 'top' | 'right' | 'bottom' | 'left' | 'center';
export type ConnectorMap = Record<string, Point>;
export interface Connector {
    type: 'node' | 'bend' | string;
    point: Point;
    connectorType?: string;
}

// NCloud

export type Region = 'kr' | 'jp' | 'sg';
