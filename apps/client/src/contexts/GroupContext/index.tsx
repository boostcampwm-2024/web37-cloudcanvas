// import { mockInitialState } from '../../../mocks';
import {
    GroupAction,
    groupReducer,
    GroupState,
} from '@contexts/GroupContext/reducer';
import { isEmpty } from '@utils';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type GroupContextProps = {
    state: GroupState;
    dispatch: React.Dispatch<GroupAction>;
};

const GroupContext = createContext<GroupContextProps | undefined>(undefined);

const initialState: GroupState = {
    groups: {},
};

export const GroupProvider = ({
    children,
    initialGroups,
}: {
    children: ReactNode;
    initialGroups?: GroupState['groups'];
}) => {
    const [state, dispatch] = useReducer(
        groupReducer,
        isEmpty(initialGroups)
            ? initialState
            : { groups: initialGroups as GroupState['groups'] },
    );

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
