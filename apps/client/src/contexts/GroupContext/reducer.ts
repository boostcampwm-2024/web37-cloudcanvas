import { findParentGroup } from '@helpers/group';
import { Group } from '@types';

export type GroupState = {
    groups: Record<string, Group>;
};

export type GroupAction =
    | { type: 'ADD_GROUP'; payload: Group }
    | { type: 'UPDATE_GROUP'; payload: Partial<Group> & { id: string } }
    | { type: 'REMOVE_GROUP'; payload: { id: string } }
    | {
          type: 'CHANGE_NODE_GROUP';
          paylod: {
              id: string;
              nodeId: string;
          };
      }
    | {
          type: 'CHANGE_GROUP';
          payload: { fromId: string; toId: string };
      }
    | {
          type: 'ADD_NODE_TO_GROUP';
          payload: { id: string; nodeId: string };
      }
    | {
          type: 'REMOVE_NODE_FROM_GROUP';
          payload: { id: string; nodeId: string };
      }
    | {
          type: 'ADD_CHILD_GROUP';
          payload: { id: string; parentId: string; nodeId: string };
      }
    | {
          type: 'EXCLUDE_NODE_FROM_GROUP';
          payload: { id: string; nodeId: string };
      };

export const groupReducer = (
    state: GroupState,
    action: GroupAction,
): GroupState => {
    switch (action.type) {
        case 'ADD_GROUP':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: action.payload,
                },
            };
        case 'UPDATE_GROUP':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: {
                        ...state.groups[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case 'REMOVE_GROUP': {
            const { id } = action.payload;
            const groupToDelete = state.groups[id];
            if (!groupToDelete) return state;

            if (groupToDelete.childGroupIds.length > 0) {
                return state;
            }

            const updatedGroups: { [id: string]: Group } = { ...state.groups };

            const deleteGroupAndCleanUp = (
                groups: { [id: string]: Group },
                groupId: string,
            ): void => {
                delete groups[groupId];

                const parentGroup = findParentGroup(groups, groupId);
                if (parentGroup) {
                    const updatedParentGroup: Group = {
                        ...parentGroup,
                        childGroupIds: parentGroup.childGroupIds.filter(
                            (childId) => childId !== groupId,
                        ),
                    };
                    groups[parentGroup.id] = updatedParentGroup;

                    if (
                        updatedParentGroup.nodeIds.length === 0 &&
                        updatedParentGroup.childGroupIds.length === 0
                    ) {
                        deleteGroupAndCleanUp(groups, parentGroup.id);
                    }
                }
            };

            deleteGroupAndCleanUp(updatedGroups, id);

            return {
                ...state,
                groups: updatedGroups,
            };
        }
        case 'ADD_NODE_TO_GROUP': {
            const { id, nodeId } = action.payload;
            const group = state.groups[id];
            if (!group) return state;
            const nodeIds = new Set([...group.nodeIds, nodeId]);
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        nodeIds: Array.from(nodeIds),
                    },
                },
            };
        }
        case 'REMOVE_NODE_FROM_GROUP': {
            const { id, nodeId } = action.payload;
            const group = state.groups[id];
            if (!group) return state;

            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        nodeIds: group.nodeIds.filter(
                            (_nodeId) => _nodeId !== nodeId,
                        ),
                    },
                },
            };
        }
        case 'EXCLUDE_NODE_FROM_GROUP': {
            const { id, nodeId } = action.payload;
            if (!state.groups[id]) return state;

            const { [id]: group, ...rest } = state.groups;
            const parentGroup = state.groups[group.parentGroupId];

            const shouldBeRemoved =
                group.nodeIds.length === 1 && group.childGroupIds.length === 0;

            return {
                ...state,
                groups: {
                    ...rest,
                    [group.parentGroupId]: {
                        ...parentGroup,
                        nodeIds: Array.from(
                            new Set([...parentGroup.nodeIds, nodeId]),
                        ),
                        childGroupIds: shouldBeRemoved
                            ? [
                                  ...parentGroup.childGroupIds.filter(
                                      (childGroupId) => childGroupId !== id,
                                  ),
                                  ...group.childGroupIds,
                              ]
                            : parentGroup.childGroupIds,
                    },
                    ...(shouldBeRemoved
                        ? {}
                        : {
                              [id]: {
                                  ...group,
                                  nodeIds: group.nodeIds.filter(
                                      (_nodeId) => _nodeId !== nodeId,
                                  ),
                              },
                          }),
                },
            };
        }
        case 'ADD_CHILD_GROUP': {
            const { id, parentId, nodeId } = action.payload;
            const group = state.groups[id];
            const parentGroup = state.groups[parentId];
            if (!parentGroup) return state;

            const nodeIds = new Set([...group.nodeIds, nodeId]);
            const childGroupIds = new Set([...parentGroup.childGroupIds, id]);
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [parentId]: {
                        ...parentGroup,
                        childGroupIds: Array.from(childGroupIds),
                        nodeIds: parentGroup.nodeIds.filter(
                            (_nodeId) => _nodeId !== nodeId,
                        ),
                    },
                    [id]: {
                        ...group,
                        nodeIds: Array.from(nodeIds),
                        parentGroupId: parentId,
                    },
                },
            };
        }
        default:
            return state;
    }
};
