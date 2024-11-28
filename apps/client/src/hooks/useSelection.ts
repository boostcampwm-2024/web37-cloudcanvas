import { useSelectionContext } from '@contexts/SelectionContext/index';
import { useSvgContext } from '@contexts/SvgContext';
import { getClosestSegEdgeIdx } from '@helpers/edge';
import { Point } from '@types';
import { getSvgPoint } from '@utils';

export default () => {
    const { svgRef } = useSvgContext();
    const { state, dispatch } = useSelectionContext();

    const selectNode = (id: string) =>
        dispatch({ type: 'SELECT_NODE', payload: { id } });

    const selectEntireEdge = (id: string, segmentIdxes: number[]) =>
        dispatch({
            type: 'SELECT_EDGE',
            payload: { id, segmentIdxes },
        });

    const selectSegEdge = (id: string, bendingPoint: Point[], point: Point) => {
        const svgPoint = getSvgPoint(svgRef.current!, point);
        const closestSegmentIdx = getClosestSegEdgeIdx(bendingPoint, svgPoint);

        dispatch({
            type: 'SELECT_EDGE',
            payload: { id, segmentIdxes: [closestSegmentIdx] },
        });
    };

    const selectGroup = (id: string) =>
        dispatch({ type: 'SELECT_GROUP', payload: { id } });

    const deselectNode = () => dispatch({ type: 'DESELECT_NODE' });

    const deselectEdge = () => dispatch({ type: 'DESELECT_EDGE' });

    const deselectGroup = (id: string) =>
        dispatch({ type: 'DESELECT_GROUP', payload: { id } });

    const clearSelection = () => dispatch({ type: 'CLEAR_SELECTION' });

    return {
        ...state,
        selectNode,
        selectSegEdge,
        selectEntireEdge,
        selectGroup,
        deselectNode,
        deselectEdge,
        deselectGroup,
        clearSelection,
    };
};
