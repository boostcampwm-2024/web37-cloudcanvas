import { ViewBox } from '@types';

export type GraphState = {
    viewBox: ViewBox;
};

export type GraphAction = {
    type: 'SET_VIEWBOX';
    payload: GraphState['viewBox'];
};

export const graphReducer = (
    state: GraphState,
    action: GraphAction,
): GraphState => {
    switch (action.type) {
        case 'SET_VIEWBOX':
            return { ...state, viewBox: action.payload };
        default:
            return state;
    }
};
