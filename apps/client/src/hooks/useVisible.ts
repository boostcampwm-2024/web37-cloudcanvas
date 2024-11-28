// TODO: 리팩토링 필요
// import {
//     GRID_2D_SIZE,
//     GRID_3D_DEPTH_SIZE,
//     GRID_3D_HEIGHT_SIZE,
//     GRID_3D_WIDTH_SIZE,
// } from '@cloud-graph/constants';
// import { Dimension, Edge, Node, ViewBox } from '@cloud-graph/types';
// import { useMemo } from 'react';
//
// type Props = {
//     nodes: Node[];
//     edges: Edge[];
//     viewBox: ViewBox;
//     dimension: Dimension;
// };
//
// export default ({ nodes, edges, viewBox, dimension }: Props) => {
//     const calculateOffset = () => {
//         return dimension === '2d'
//             ? { width: GRID_2D_SIZE, height: GRID_2D_SIZE }
//             : {
//                   width: GRID_3D_WIDTH_SIZE,
//                   height: GRID_3D_HEIGHT_SIZE + GRID_3D_DEPTH_SIZE,
//               };
//     };
//
//     const isNodeVisible = (node: Node) => {
//         const { x, y } = node.point;
//         const offset = calculateOffset();
//
//         return (
//             x >= viewBox.x - offset.width &&
//             x <= viewBox.x + viewBox.width + offset.width &&
//             y >= viewBox.y - offset.height &&
//             y <= viewBox.y + viewBox.height + offset.height
//         );
//     };
//
//     const visibleNodes: Node[] = useMemo(
//         () => nodes.filter(isNodeVisible),
//         [nodes, isNodeVisible],
//     );
//
//     const mapEdgeToVisibleNodes = (edge: Edge) => {
//         const sourceNode = visibleNodes.find(
//             (node) => node.id === edge.source.node.id,
//         );
//         const targetNode = nodes.find(
//             (node) => node.id === edge.target.node.id,
//         );
//
//         return sourceNode && targetNode
//             ? {
//                   ...edge,
//                   source: {
//                       node: sourceNode,
//                       anchorType: edge.source.anchorType,
//                   },
//                   target: {
//                       node: targetNode,
//                       anchorType: edge.target.anchorType,
//                   },
//               }
//             : null;
//     };
//
//     const visibleEdges = useMemo(
//         () => edges.map(mapEdgeToVisibleNodes).filter((node) => node !== null),
//         [edges, mapEdgeToVisibleNodes],
//     );
//
//     return { visibleNodes, visibleEdges };
// };
