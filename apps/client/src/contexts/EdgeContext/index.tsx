import {
    EdgeAction,
    edgeReducer,
    EdgeState,
} from '@contexts/EdgeContext/reducer';
import { Edge } from '@types';
import { isEmpty } from '@utils';
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

export const EdgeProvider = ({
    children,
    initialEdges,
}: {
    children: ReactNode;
    initialEdges?: EdgeState['edges'];
}) => {
    const [state, dispatch] = useReducer(edgeReducer, {
        edges: isEmpty(initialEdges)
            ? initialState.edges
            : (initialEdges as EdgeState['edges']),
        connection: null,
    });

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
