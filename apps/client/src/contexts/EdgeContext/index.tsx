import {
    EdgeAction,
    edgeReducer,
    EdgeState,
} from '@contexts/EdgeContext/reducer';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type EdgeContextProps = {
    state: EdgeState;
    dispatch: React.Dispatch<EdgeAction>;
};

const EdgeContext = createContext<EdgeContextProps | undefined>(undefined);

const initialState: EdgeState = {
    edges: {},
    connection: null,
};

export const EdgeProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(edgeReducer, initialState);

    return (
        <EdgeContext.Provider value={{ state, dispatch }}>
            {children}
        </EdgeContext.Provider>
    );
};

export const useEdgeContext = () => {
    const context = useContext(EdgeContext);
    if (!context) {
        throw new Error('EdgeContext: context is undefined');
    }
    return context;
};
