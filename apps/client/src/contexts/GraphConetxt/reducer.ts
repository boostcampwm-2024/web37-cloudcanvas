import { ViewBox } from '@types';

export type GraphState = {
    viewBox: ViewBox;
    initialViewBox: ViewBox;
};

export type GraphAction = {
    type: 'SET_VIEWBOX';
    payload: GraphState['viewBox'];
};
// | {
//       type: 'INITIAL_VIEWBOX';
//       payload: GraphState['initialViewBox'];
//   };

export const graphReducer = (
    state: GraphState,
    action: GraphAction,
): GraphState => {
    switch (action.type) {
        case 'SET_VIEWBOX':
            return { ...state, viewBox: action.payload };
        // case 'INITIAL_VIEWBOX': {
        //     return {
        //         ...state,
        //         viewBox: action.payload,
        //         initialViewBox: action.payload,
        //     };
        // }
        default:
            return state;
    }
};
