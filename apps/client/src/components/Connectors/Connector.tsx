import { useTheme } from '@mui/material';
import { Point } from '@types';

type Props = {
    visible: boolean;
    point: Point;
    onMouseDown: (e: React.MouseEvent) => void;
};

export default ({ point, visible, onMouseDown }: Props) => {
    const theme = useTheme();

    return (
        <circle
            r={6}
            cx={point.x}
            cy={point.y}
            fill={theme.palette.text.primary}
            style={{
                visibility: visible ? 'visible' : 'hidden',
            }}
            onMouseDown={onMouseDown}
        />
    );
};
