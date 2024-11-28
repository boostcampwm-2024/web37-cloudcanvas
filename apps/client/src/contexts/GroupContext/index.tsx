// import { mockInitialState } from '../../../mocks';
import {
    GroupAction,
    groupReducer,
    GroupState,
} from '@contexts/GroupContext/reducer';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

type GroupContextProps = {
    state: GroupState;
    dispatch: React.Dispatch<GroupAction>;
};

const GroupContext = createContext<GroupContextProps | undefined>(undefined);

const initialState: GroupState = {
    groups: {},
};

export const GroupProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(groupReducer, initialState);

    return (
        <GroupContext.Provider value={{ state, dispatch }}>
            {children}
        </GroupContext.Provider>
    );
};

export const useGroupContext = () => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error('useGroupContext must be used within a GroupProvider');
    }
    return context;
};
