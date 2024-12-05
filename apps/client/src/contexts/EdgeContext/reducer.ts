import { Edge, Point } from '@types';

export type EdgeState = {
    edges: Record<string, Edge>;
    connection: { from: Point; to: Point } | null;
};

export type EdgeAction =
    | { type: 'ADD_EDGE'; payload: Omit<Edge, 'bendingPoints'> }
    | { type: 'UPDATE_EDGE'; payload: Partial<Edge> & { id: string } }
    | { type: 'UPDATE_EDGES'; payload: Record<string, Edge> }
    | {
          type: 'REMOVE_EDGE';
          payload: { id: string; segmentIdxes: number[] };
      }
    | {
          type: 'SPLIT_EDGE';
          payload: { id: string; point: Point; insertAfter: number };
      }
    | { type: 'REMOVE_EDGES'; payload: string[] }
    | {
          type: 'MOVE_BENDING_POINTER';
          payload: {
              id: string;
              bendingPointer: {
                  index: number;
                  point: Point;
              };
              connector?: {
                  [key: string]: {
                      id: string;
                      connectorType: string;
                  };
              };
          };
      };

export const edgeReducer = (
    state: EdgeState,
    action: EdgeAction,
): EdgeState => {
    switch (action.type) {
        case 'ADD_EDGE':
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [action.payload.id]: {
                        ...action.payload,
                        bendingPoints: [],
                    },
                },
            };
        case 'UPDATE_EDGE':
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [action.payload.id]: {
                        ...state.edges[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case 'UPDATE_EDGES': {
            return {
                ...state,
                edges: {
                    ...state.edges,
                    ...action.payload,
                },
            };
        }
        case 'REMOVE_EDGES': {
            const removedEdges = action.payload;
            const remainingEdges = Object.values(state.edges).reduce(
                (acc, edge) => {
                    if (removedEdges.includes(edge.id)) return acc;
                    return {
                        ...acc,
                        [edge.id]: {
                            ...edge,
                        },
                    };
                },
                {},
            );

            return {
                ...state,
                edges: {
                    ...remainingEdges,
                },
            };
        }
        case 'REMOVE_EDGE': {
            const { id, segmentIdxes } = action.payload;
            const { [id]: removedEdge, ...remainingEdges } = state.edges;
            let updatedEdges = {};
            if (
                removedEdge.bendingPoints.length >= segmentIdxes.length &&
                removedEdge.bendingPoints.length > 0
            ) {
                const newBendPoints = removedEdge.bendingPoints.filter(
                    (_, idx) => {
                        //INFO: bendingPoints와 segmentIdxes의 수가 동일시 되지 않아 조정이 필요
                        //마지막 선분이 아닌 첫번째 선분을 따로 처리하게 되면 선분이 삭제되고 다음 선분으로 선택됨
                        //따라서 첫번째 선분이 아닌 마지막 선분을 따로 처리하는 방안으로 변경
                        if (
                            segmentIdxes.includes(
                                removedEdge.bendingPoints.length,
                            ) &&
                            idx === removedEdge.bendingPoints.length - 1
                        ) {
                            return false;
                        }

                        return !segmentIdxes.includes(idx);
                    },
                );

                updatedEdges = {
                    [id]: {
                        ...removedEdge,
                        bendingPoints: newBendPoints,
                    },
                };
            }

            return {
                ...state,
                edges: {
                    ...remainingEdges,
                    ...updatedEdges,
                },
            };
        }
        case 'SPLIT_EDGE': {
            const { id, point, insertAfter } = action.payload;
            const edge = state.edges[id];
            if (!edge) return state;

            const newBendPoints = [...edge.bendingPoints];
            newBendPoints.splice(insertAfter, 0, point);
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [id]: {
                        ...edge,
                        bendingPoints: newBendPoints,
                    },
                },
            };
        }
        case 'MOVE_BENDING_POINTER': {
            const { id, bendingPointer, connector } = action.payload;
            const edge = state.edges[id];
            const { index, point } = bendingPointer;
            if (!edge || index < 0 || index >= edge.bendingPoints.length)
                return state;

            const updatedBendPoints = [...edge.bendingPoints];
            updatedBendPoints[index] = point;

            let updatedConnector = {};
            if (connector) updatedConnector = connector;
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [id]: {
                        ...edge,
                        bendingPoints: updatedBendPoints,
                        ...updatedConnector,
                    },
                },
            };
        }
        default:
            return state;
    }
};
