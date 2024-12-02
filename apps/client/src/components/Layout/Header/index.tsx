import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionsButtons from './ActionsButtons';
import UtilityButtons from './UtilityButtons';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
}));

export default () => {
    return (
        <>
            <StyledBox>
                <Stack>
                    <Typography variant="h6" textTransform="uppercase">
                        Cloud Canvas
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <ActionsButtons />
                    <UtilityButtons />
                </Stack>
            </StyledBox>
        </>
    );
};
