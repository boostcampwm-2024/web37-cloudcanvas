import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled, useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
    const { mode } = useColorScheme();
    return (
        <>
            <StyledBox>
                <Stack>
                    <a
                        href="http://localhost:5000"
                        style={{
                            color: mode === 'light' ? 'black' : 'white',
                            textDecoration: 'none',
                        }}
                    >
                        <Typography variant="h6" textTransform="uppercase">
                            Cloud Canvas
                        </Typography>
                    </a>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <ActionsButtons />
                    <UtilityButtons />
                </Stack>
            </StyledBox>
        </>
    );
};
