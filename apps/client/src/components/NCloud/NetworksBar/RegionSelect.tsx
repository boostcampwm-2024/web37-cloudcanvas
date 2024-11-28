import { Region } from '@types';
import { Regions } from '@/src/models/ncloud';
import useNCloud from '@hooks/useNCloud';
import { ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

const REGION_OPTIONS = [
    {
        value: 'kr',
        label: 'Korea',
    },
    {
        value: 'jp',
        label: 'Japan',
    },
    {
        value: 'sg',
        label: 'Singapore',
    },
];

type Props = {
    region: string;
    onUpdateRegion: (region: Region) => void;
};

export default ({ region, onUpdateRegion }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (value: Region) => {
        onUpdateRegion(value);
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
                <Button onClick={handlePopoverOpen} variant="text">
                    {Regions[region]}
                </Button>
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
                    {REGION_OPTIONS.map((option) => (
                        <ListItemButton
                            key={option.value}
                            selected={region === option.value}
                            onClick={() =>
                                handleListItemClick(option.value as Region)
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
