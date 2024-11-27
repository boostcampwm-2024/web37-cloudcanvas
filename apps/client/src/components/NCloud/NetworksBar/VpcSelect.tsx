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
import { nanoid } from 'nanoid';
import { findKeyByValue } from '@utils';

type Props = {
    vpc: { [id: string]: string } | undefined;
    vpcList: { [id: string]: string };
    disabled?: boolean;
    onChangeVpc: (id: string, newVpc: string) => void;
    onRemoveVpc: (vpc: string) => void;
};

export default ({
    vpc,
    vpcList,
    disabled = false,
    onChangeVpc,
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

    const handleListItemClick = (id: string, value: string) => {
        if (vpc?.id !== id) {
            onChangeVpc(id, value);
        }
        setAnchorEl(null);
    };

    //TODO: 숫자 validation
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newVpc = e.currentTarget.vpc.value;
        if (newVpc) {
            const id = findKeyByValue(newVpc, vpcList) ?? `vpc-${nanoid()}`;
            onChangeVpc(id, newVpc);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'vpc' : undefined;

    return (
        <Box>
            <Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    VPC
                </Typography>

                <Tooltip
                    title="Subnet을 해제해야 합니다."
                    disableHoverListener={!disabled}
                    disableFocusListener={!disabled}
                >
                    <span>
                        <Button
                            onClick={handlePopoverOpen}
                            variant="text"
                            type="submit"
                            disabled={disabled}
                            disableRipple
                        >
                            {vpc ? vpc.value : <AddCircleOutlineIcon />}
                        </Button>
                    </span>
                </Tooltip>
            </Typography>

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
                <form onSubmit={handleSubmit}>
                    <Input
                        name="vpc"
                        fullWidth
                        placeholder="Search services"
                        onKeyDown={(e) => e.stopPropagation()}
                        endAdornment={
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        }
                    />
                </form>
                <List component="nav">
                    {Object.entries(vpcList).map(([id, value]) => (
                        <ListItem
                            key={id}
                            onClick={() =>
                                handleListItemClick(id, value as string)
                            }
                            secondaryAction={
                                <span>
                                    <IconButton
                                        edge="end"
                                        color="error"
                                        aria-label="delete"
                                        onClick={() => onRemoveVpc(id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            }
                            style={{
                                backgroundColor:
                                    vpc?.id === id
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
