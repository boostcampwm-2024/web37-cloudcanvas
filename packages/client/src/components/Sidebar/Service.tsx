import ServiceInstanceItem from '@components/Sidebar/ServiceInstance';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledService = styled(Accordion)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? undefined : theme.palette.primary.main,
    color: theme.palette.text.primary,
    ['&:hover']: {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.primary.light,
    },
    [`&:before`]: {
        height: 0,
    },
    [`&:first-of-type`]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    [`&:last-of-type`]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    color: theme.palette.white,
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: 0,
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
}));

export default ({
    title,
    items,
}: {
    title: string;
    items: Array<{
        title: string;
        desc: string;
        nodeType?: string;
    }>;
}) => {
    const { state, dispatch } = useFlowInstanceContext();

    const handleAddInstance = (type: string) => {
        dispatch({
            type: 'ADD_NODE',
            payload: {
                id: `${type}-${state.nodes.length + 1}`,
                type,
            },
        });
    };

    return (
        <StyledService elevation={0} disableGutters>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    sx={{
                        textTransform: 'capitalize',
                    }}
                >
                    {title}
                </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
                <List
                    sx={{
                        overflow: 'hidden',
                        padding: 0,
                    }}
                >
                    {items.map((item, index) => (
                        <ServiceInstanceItem
                            key={`${title}-${index}`}
                            title={item.title}
                            desc={item.desc}
                            onClick={() =>
                                handleAddInstance(item.nodeType || '')
                            }
                        />
                    ))}
                </List>
            </StyledAccordionDetails>
        </StyledService>
    );
};
