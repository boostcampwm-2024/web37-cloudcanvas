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

type Props = {
    subnet: string;
    subnetList: { [id: string]: string };
    disabled?: boolean;
    disabledRemove?: boolean;
    onUpdateSubnet: (subnet: string) => void;
    onRemoveSubnet: (subnet: string) => void;
};

export default ({
    subnet,
    subnetList,
    disabled = false,
    disabledRemove = false,
    onUpdateSubnet,
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

    const handleListItemClick = (value: string) => {
        onUpdateSubnet(value);
        setAnchorEl(null);
    };

    const handleAddVPC = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const vpc = e.currentTarget.vpc.value;
        if (vpc) {
            onUpdateSubnet(vpc);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'vpc' : undefined;

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
                <Button
                    onClick={handlePopoverOpen}
                    variant="text"
                    type="submit"
                    disabled={disabled}
                    disableRipple
                >
                    {subnet || <AddCircleOutlineIcon />}
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
                sx={{
                    ['& .MuiPopover-paper']: {
                        padding: 2,
                    },
                }}
            >
                <form onSubmit={handleAddVPC}>
                    <Input
                        name="vpc"
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
                            onClick={() => handleListItemClick(value as string)}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    disabled={disabledRemove}
                                    onClick={() => onRemoveSubnet(id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            style={{
                                backgroundColor:
                                    subnet === value
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
