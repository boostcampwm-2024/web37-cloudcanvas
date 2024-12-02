import { useSvgContext } from '@contexts/SvgContext';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { styled } from '@mui/material/styles';
import React, { memo, ReactNode, useState } from 'react';

type Props = {
    actions: {
        icon: ReactNode;
        name: string;
        type: string;
    }[];
    point: { top: number; left: number };
    selectedNodeId: string;
    onClickActions: (e: React.MouseEvent, type: string) => void;
};

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    [`& .MuiSpeedDial-fab`]: {
        width: 38,
        height: 32,
    },
    [`& .MuiSpeedDial-actions`]: {
        paddingTop: 30,
    },
}));

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
    [`& .MuiSpeedDialAction-fab`]: {
        width: 20,
        height: 20,
    },
}));

export default ({ actions, point, onClickActions }: Props) => {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const offset = 10;

    const handleClickActions = (e: React.MouseEvent, type: string) => {
        e.stopPropagation();
        onClickActions(e, type);
        handleClose();
        setHidden(true);
    };

    return (
        <StyledSpeedDial
            ariaLabel="Node Actions"
            className="graph-ignore-select"
            sx={{
                position: 'absolute',
                top: point.top - offset,
                left: point.left + offset,
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            hidden={hidden}
            onOpen={handleOpen}
            direction="down"
            open={open}
        >
            {actions.map((action) => (
                <StyledSpeedDialAction
                    className="graph-ignore-select"
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={(e) => handleClickActions(e, action.type)}
                />
            ))}
        </StyledSpeedDial>
    );
};
