import useDrag from '@hooks/useDrag';
import { Bounds, Group, Point } from '@types';
import { useEffect } from 'react';
import Rect3D from './ncloud/Rect3D';

const GroupFacctory = (group: Group & { bounds: Bounds }) => {
    switch (group.type) {
        case 'region':
        case 'subnet':
        case 'vpc':
        case 'security-group':
            return <Rect3D {...group} />;
    }
};

type Props = {
    group: Group;
    bounds: Bounds;
    onMove: (id: string, offset: Point) => void;
};

export default ({ group, bounds, onMove }: Props) => {
    const { id } = group;
    const { isDragging, startDrag, drag, stopDrag } = useDrag({
        initialPoint: { x: bounds.x, y: bounds.y },
        updateFn: (point) => {
            const offset = {
                x: point.x - bounds.x,
                y: point.y - bounds.y,
            };

            onMove(id, offset);
        },
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
        drag({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = () => {
        stopDrag();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <g
            id={id}
            transform={`translate(${bounds.x} ${bounds.y})`}
            onMouseDown={handleMouseDown}
        >
            {GroupFacctory({ ...group, bounds })}
        </g>
    );
};
