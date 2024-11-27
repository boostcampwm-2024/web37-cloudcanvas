import ServerProperties from '@components/NCloud/PropertiesBar/ServerProperties';
import useNCloud from '@hooks/useNCloud';
import { AppBar, Toolbar } from '@mui/material';
export default () => {
    const { selectedResource } = useNCloud();

    return (
        <AppBar
            position="fixed"
            className="graph-ignore-select"
            color="default"
            sx={{
                top: 180,
                left: 320,
                right: 0,
                borderRadius: '20px',
                maxWidth: 'min-content',
                display: selectedResource ? 'block' : 'none',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    gap: 2,
                    paddingY: 2,
                }}
            >
                <ServerProperties />
            </Toolbar>
        </AppBar>
    );
};
