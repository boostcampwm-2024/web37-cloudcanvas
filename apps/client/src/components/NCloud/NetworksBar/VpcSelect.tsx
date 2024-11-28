import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Tooltip } from '@mui/material';

type Props = {
    vpc: string;
    vpcList: { [id: string]: string };
    disabled?: boolean;
    disabledRemove?: boolean;
    onUpdateVpc: (vpc: string) => void;
    onRemoveVpc: (vpc: string) => void;
};

export default ({
    vpc,
    vpcList,
    disabled = false,
    disabledRemove = false,
    onUpdateVpc,
    onRemoveVpc,
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
        onUpdateVpc(value);
        setAnchorEl(null);
    };

    const handleAddVPC = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const vpc = e.currentTarget.vpc.value;
        if (vpc) {
            onUpdateVpc(vpc);
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
                    VPC
                </Typography>
                <Button
                    onClick={handlePopoverOpen}
                    variant="text"
                    type="submit"
                    disabled={disabled}
                    disableRipple
                >
                    {vpc || <AddCircleOutlineIcon />}
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
                    {Object.entries(vpcList).map(([id, value]) => (
                        <ListItem
                            key={id}
                            onClick={() => handleListItemClick(value as string)}
                            secondaryAction={
                                <Tooltip
                                    title="Subnet을 먼저 삭제해주세요"
                                    disableHoverListener={!disabledRemove}
                                >
                                    <span>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            disabled={disabledRemove}
                                            onClick={() => onRemoveVpc(id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            }
                            style={{
                                backgroundColor:
                                    vpc === value
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
