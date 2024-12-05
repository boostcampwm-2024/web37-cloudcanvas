import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';

type Props = {
    subnet: { [id: string]: string } | undefined;
    subnetList: { [id: string]: string };
    disabled?: boolean;
    onChangeSubnet: (id: string, newSubnet: string) => void;
    onRemoveSubnet: (subnet: string) => void;
};

export default ({
    subnet,
    subnetList,
    disabled = false,
    onChangeSubnet,
    onRemoveSubnet,
}: Props) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (id: string, value: string) => {
        if (subnet?.id !== id) {
            onChangeSubnet(id, value);
        }
        setAnchorEl(null);
    };

    const handleAddSubnet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSubnet = e.currentTarget.subnet.value;
        if (newSubnet) {
            onChangeSubnet(`subnet-${nanoid()}`, newSubnet);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'subnet' : undefined;

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
                    Subnet
                </Typography>
                <Tooltip
                    title="Subnet을 변경하려면 VPC를 선택해야 합니다."
                    disableHoverListener={!disabled}
                    disableFocusListener={!disabled}
                >
                    <span>
                        <Button
                            onClick={handlePopoverOpen}
                            variant="text"
                            disabled={disabled}
                            disableRipple
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            {subnet ? subnet.value : <AddCircleOutlineIcon />}
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
                sx={{
                    ['& .MuiPopover-paper']: {
                        padding: 2,
                    },
                }}
            >
                <form onSubmit={handleAddSubnet}>
                    <Input
                        name="subnet"
                        fullWidth
                        placeholder="Search services"
                        onKeyDown={(e) => e.stopPropagation()}
                        endAdornment={
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        }
                    />
                </form>
                <List component="nav">
                    {Object.entries(subnetList).map(([id, value]) => (
                        <ListItem
                            key={id}
                            onClick={() =>
                                handleListItemClick(id, value as string)
                            }
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    color="error"
                                    aria-label="delete"
                                    onClick={() => onRemoveSubnet(id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            style={{
                                backgroundColor:
                                    subnet?.id === id
                                        ? theme.palette.action.selected
                                        : undefined,
                            }}
                        >
                            <ListItemText primary={value} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};
