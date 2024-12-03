import { useGraphContext } from '@contexts/GraphConetxt';
import { useSvgContext } from '@contexts/SvgContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import InsightsIcon from '@mui/icons-material/Insights';
import { Connection, Node, Point } from '@types';
import { useEffect, useMemo } from 'react';
import SpeedDial from './SpeedDial';

type Props = {
    node: Node;
    isConnecting: boolean;
    onOpenConnection: (from: Connection) => void;
    onConnectConnection: (point: Point) => void;
    onRemoveNode: (id: string) => void;
};

const actions = [
    { icon: <InsightsIcon />, name: 'Edge', type: 'edge' },
    { icon: <DeleteIcon />, name: 'Remove', type: 'remove' },
];
export default ({
    node,
    isConnecting,
    onOpenConnection,
    onConnectConnection,
    onRemoveNode,
}: Props) => {
    const { id: selectedNodeId, connectors } = node;
    const { svgRef } = useSvgContext();
    const {
        state: { viewBox },
    } = useGraphContext();
    const handleClickActions = (e: React.MouseEvent, type: string) => {
        switch (type) {
            case 'edge': {
                openConnection(e, 'right', node.connectors.right);
                return;
            }
            case 'remove': {
                onRemoveNode(selectedNodeId);
                return;
            }
            default: {
                console.error('Not supported action type');
            }
        }
    };
    const openConnection = (
        e: React.MouseEvent,
        connectorType: string,
        point: Point,
    ) => {
        e.stopPropagation();
        onOpenConnection({
            id: selectedNodeId,
            connectorType,
            point,
        });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        onConnectConnection({ x: clientX, y: clientY });
    };

    useEffect(() => {
        if (isConnecting) {
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isConnecting]);

    const point = useMemo(() => {
        if (!svgRef.current) return null;
        const nodeDOM = svgRef.current.getElementById(selectedNodeId);
        if (!nodeDOM) return null;
        const rect = nodeDOM.getBoundingClientRect();
        return {
            top: rect.y,
            left: rect.x + rect.width,
        };
    }, [node, viewBox]);
    return (
        <SpeedDial
            selectedNodeId={node.id}
            actions={actions}
            point={point ?? { top: 0, left: 0 }}
            onClickActions={handleClickActions}
        />
    );
};
