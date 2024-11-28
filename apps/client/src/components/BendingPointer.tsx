import useDrag from '@hooks/useDrag';
import { useTheme } from '@mui/material';
import { Point } from '@types';
import { useEffect } from 'react';

type Props = {
    edgeId: string;
    point: Point;
    index: number;
    onMove: (point: Point) => void;
};

export default ({ point, onMove }: Props) => {
    const theme = useTheme();
    const { isDragging, startDrag, drag, stopDrag } = useDrag({
        initialPoint: point,
        updateFn: (newPoint) => onMove(newPoint),
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        drag({ x: e.clientX, y: e.clientY });
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
        <circle
            cx={point.x}
            cy={point.y}
            r={6}
            fill={theme.palette.text.primary}
            onMouseDown={handleMouseDown}
        />
    );
};
