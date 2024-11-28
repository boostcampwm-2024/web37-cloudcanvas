import {
    SelectionAction,
    SelectionState,
    selectionReducer,
} from '@contexts/SelectionContext/reducer';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type SelectionContextProps = {
    state: SelectionState;
    dispatch: Dispatch<SelectionAction>;
};

const SelectionContext = createContext<SelectionContextProps | undefined>(
    undefined,
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(selectionReducer, {
        selectedNodeId: undefined,
        selectedEdge: undefined,
        selectedGroupId: undefined,
    });

    return (
        <SelectionContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelectionContext = () => {
    const context = useContext(SelectionContext);
    if (!context) {
        throw new Error('SelectionContext: context is undefined');
    }
    return context;
};
