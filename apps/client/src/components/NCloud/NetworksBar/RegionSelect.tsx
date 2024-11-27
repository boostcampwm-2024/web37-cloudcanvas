import { REGIONS } from '@/src/models/ncloud/constants';
import { ListItemIcon, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import { Region } from '@types';
import { useState } from 'react';

type Props = {
    region: { [key: string]: any };
    disabled?: boolean;
    onChangeRegion: (id: string, region: Region) => void;
};

export default ({ region, disabled = false, onChangeRegion }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (id: string, value: Region) => {
        if (region.id !== id) {
            onChangeRegion(id, value);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'region' : undefined;

    return (
        <Box>
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Region
                </Typography>

                <Tooltip
                    title="Region을 변경하려면 VPC를 해제해야 합니다."
                    disableHoverListener={!disabled}
                >
                    <span>
                        <Button
                            onClick={handlePopoverOpen}
                            variant="text"
                            disabled={disabled}
                            disableRipple
                        >
                            {region.value}
                        </Button>
                    </span>
                </Tooltip>
            </Box>

            <Popover
                id={id}
                className="graph-ignore-select"
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List component="nav">
                    {Object.values(REGIONS).map((option) => (
                        <ListItemButton
                            key={option.value}
                            selected={region.id === option.id}
                            onClick={() =>
                                handleListItemClick(
                                    option.id,
                                    option.value as Region,
                                )
                            }
                        >
                            <ListItemIcon>
                                <img
                                    src={`assets/${option.value.toUpperCase()}.svg`}
                                    alt="flag"
                                />
                            </ListItemIcon>
                            <ListItemText primary={option.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};
