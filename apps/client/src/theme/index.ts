import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        white: '#fff',
        black: '#000',
        lines: {
            primary: {
                light: grey[900],
                dark: grey[100],
            },
            secondary: {
                light: grey[400],
                dark: grey[700],
            },
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: theme.palette.background.paper,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px',
                        border: `2px solid ${theme.palette.background.paper}`,
                    },
                    /* Firefox */
                    '&': {
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
                    },
                    /* IE 10+ */
                    '&::-ms-scrollbar': {
                        width: '8px',
                    },
                    '&::-ms-scrollbar-track': {
                        background: theme.palette.background.paper,
                    },
                    '&::-ms-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px',
                        border: `2px solid ${theme.palette.background.paper}`,
                    },
                },
                '[data-type="graph-edge"],[data-type="graph-node"]': {
                    '&:hover': {
                        cursor: 'pointer',
                    },
                },
                html: {
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                },
                body: {
                    height: '100%',
                    width: '100%',
                },
                '#root': {
                    height: '100dvh',
                    width: '100%',
                },
            }),
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    ['& .MuiAccordionSummary-expandIconWrapper']: {
                        color: 'inherit',
                    },
                },
            },
        },
    },
    custom: {
        sidebarWidth: 300,
        animation: {
            move: '0.2s ease-in-out',
        },
    },
});

export default theme;
