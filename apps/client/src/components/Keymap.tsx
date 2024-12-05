import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

// 키 맵 항목을 위한 스타일링된 컴포넌트
const KeyMapItem = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    marginBottom: theme.spacing(1),
}));

// 키 표시를 위한 스타일링된 박스
const KeyBox = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    padding: '4px 8px',
    backgroundColor: theme.palette.background.paper,
    marginRight: theme.spacing(1),
    display: 'inline-block',
}));

const KeyMap = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
                zIndex: 1300,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: theme.spacing(2),
                    backgroundColor: theme.palette.background.paper,
                    opacity: 0.9,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Shortcut Key
                </Typography>
                <Stack spacing={1}>
                    <KeyMapItem direction="row" spacing={1}>
                        <KeyBox>Space</KeyBox>
                        <Typography variant="body2">+</Typography>
                        <KeyBox>Drag</KeyBox>
                        <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                            : Pan 기능
                        </Typography>
                    </KeyMapItem>
                    <KeyMapItem direction="row" spacing={1}>
                        <KeyBox>Wheel</KeyBox>
                        <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                            : 줌 인/아웃
                        </Typography>
                    </KeyMapItem>
                    <KeyMapItem direction="row" spacing={1}>
                        <KeyBox>Ctrl</KeyBox>
                        <Typography variant="body2">+</Typography>
                        <KeyBox>Click</KeyBox>
                        <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                            : Edge 분할
                        </Typography>
                    </KeyMapItem>
                    <KeyMapItem direction="row" spacing={1}>
                        <KeyBox>Double Click</KeyBox>
                        <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                            : Edge 전체 선택
                        </Typography>
                    </KeyMapItem>
                    <KeyMapItem direction="row" spacing={1}>
                        <KeyBox>Select</KeyBox>
                        <Typography variant="body2">+</Typography>
                        <KeyBox>Backspace</KeyBox>
                        <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                            : 삭제
                        </Typography>
                    </KeyMapItem>
                </Stack>
            </Paper>
        </Box>
    );
};

export default KeyMap;
