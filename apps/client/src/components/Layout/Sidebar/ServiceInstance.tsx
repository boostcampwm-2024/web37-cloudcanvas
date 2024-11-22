import useGraphActions from '@hooks/useGraphActions';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const StyledServiceInstance = styled(ListItem)(({ theme }) => ({
    cursor: 'pointer',
    ['&:not(:last-child)']: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    ['&:hover']: {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledServiceInstanceText = styled(ListItemText)(({ theme }) => ({
    [`& .MuiListItemText-primary `]: {
        color: theme.palette.text.primary,
    },
}));

export default ({
    title,
    type,
    desc,
    ...props
}: { title: string; desc: string; type: string } & ListItemProps) => {
    const { addNode } = useGraphActions();

    return (
        <StyledServiceInstance
            key={title}
            {...props}
            onClick={() => addNode(type)}
        >
            <StyledServiceInstanceText primary={title} secondary={desc} />
        </StyledServiceInstance>
    );
};
