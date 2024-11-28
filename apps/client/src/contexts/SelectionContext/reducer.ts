export type SelectionState = {
    selectedNodeId?: string;
    selectedEdge?: {
        id: string;
        segmentIdxes: number[];
    };
    selectedGroupId?: string;
};

export type SelectionAction =
    | { type: 'SELECT_NODE'; payload: { id: string } }
    | { type: 'SELECT_EDGE'; payload: { id: string; segmentIdxes: number[] } }
    | { type: 'SELECT_GROUP'; payload: { id: string } }
    | { type: 'DESELECT_NODE' }
    | { type: 'DESELECT_EDGE' }
    | { type: 'DESELECT_GROUP'; payload: { id: string } }
    | { type: 'CLEAR_SELECTION' };

export const selectionReducer = (
    state: SelectionState,
    action: SelectionAction,
): SelectionState => {
    switch (action.type) {
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNodeId: action.payload.id,
                selectedEdge: undefined,
            };
        case 'SELECT_EDGE':
            return {
                ...state,
                selectedEdge: {
                    id: action.payload.id,
                    segmentIdxes: [...action.payload.segmentIdxes],
                },
                selectedNodeId: undefined,
            };
        case 'SELECT_GROUP':
            return {
                ...state,
                selectedGroupId: action.payload.id,
                selectedEdge: undefined,
                selectedNodeId: undefined,
            };
        case 'DESELECT_NODE':
            return {
                ...state,
                selectedNodeId: undefined,
            };
        case 'DESELECT_EDGE':
            return {
                ...state,
                selectedEdge: undefined,
            };
        case 'DESELECT_GROUP':
            return {
                ...state,
                selectedGroupId: undefined,
            };
        case 'CLEAR_SELECTION':
            return {
                selectedNodeId: undefined,
                selectedEdge: undefined,
                selectedGroupId: undefined,
            };
        default:
            return state;
    }
};
