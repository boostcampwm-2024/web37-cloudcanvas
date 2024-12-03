import { styled, useColorScheme } from '@mui/material/styles';
import { IconButton, ButtonGroup, Divider } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

const GITHUB_URL = 'https://github.com/boostcampwm-2024/web37-cloud-canvas';
const NOTION_URL =
    'https://pleasant-muenster-8f5.notion.site/Boostcamp-Web37-cloud-canvas-12a389341f0a806dbb98d597fd7b4e52?pvs=4';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`,
    scale: 0.8,
    [`&:hover`]: {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        transition: 'border 0.3s linear',
    },
}));

export default () => {
    const { mode: themeMode, setMode: setThemeMode } = useColorScheme();
    const handleToggleTheme = () =>
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark');

    const openWindow = (url: string) => window.open(url, '_blank')?.focus();
    return (
        <ButtonGroup>
            <StyledIconButton onClick={() => openWindow(GITHUB_URL)}>
                <GitHubIcon />
            </StyledIconButton>
            <Divider orientation="vertical" variant="middle" flexItem />
            <StyledIconButton onClick={() => openWindow(NOTION_URL)}>
                <ManageHistoryIcon />
            </StyledIconButton>
            <Divider orientation="vertical" variant="middle" flexItem />
            <StyledIconButton onClick={handleToggleTheme}>
                {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </StyledIconButton>
        </ButtonGroup>
    );
};
