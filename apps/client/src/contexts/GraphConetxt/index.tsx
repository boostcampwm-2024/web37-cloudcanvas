import {
    GraphAction,
    graphReducer,
    GraphState,
} from '@contexts/GraphConetxt/reducer';
import { ViewBox } from '@types';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useLayoutEffect,
    useReducer,
} from 'react';

type GraphContextProps = {
    state: GraphState;
    dispatch: Dispatch<GraphAction>;
};

const CanvasContext = createContext<GraphContextProps | undefined>(undefined);

const initialState = {
    viewBox: { x: 0, y: 0, width: 0, height: 0 },
    initialViewBox: { x: 0, y: 0, width: 0, height: 0 },
};

export const GraphProvider = ({
    children,
    initialViewBox,
}: {
    children: ReactNode;
    initialViewBox: ViewBox;
}) => {
    const [state, dispatch] = useReducer(graphReducer, {
        ...initialState,
        viewBox: initialViewBox,
        initialViewBox,
    });

    return (
        <CanvasContext.Provider value={{ state, dispatch }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useGraphContext = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error('GraphContext: context is undefined');
    }
    return context;
};
