// import { mockInitialState } from '../../../mocks';
import {
    NodeAction,
    nodeReducer,
    NodeState,
} from '@contexts/NodeContext/reducer';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type NodeContextProps = {
    state: NodeState;
    dispatch: Dispatch<NodeAction>;
};

const NodeContext = createContext<NodeContextProps | undefined>(undefined);

const initialState: NodeState = {
    nodes: {},
};

export const NodeProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(nodeReducer, initialState);

    return (
        <NodeContext.Provider value={{ state, dispatch }}>
            {children}
        </NodeContext.Provider>
    );
};

export const useNodeContext = () => {
    const context = useContext(NodeContext);
    if (!context) {
        throw new Error('NodeContext: context is undefined');
    }
    return context;
};
