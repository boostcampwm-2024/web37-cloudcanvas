import ServerProperties from '@components/NCloud/PropertiesBar/ServerProperties';
import useNCloud from '@hooks/useNCloud';
import { AppBar, Toolbar, Typography } from '@mui/material';

const PropertiesFactory = (type: string) => {
    switch (type) {
        case 'server': {
            return <ServerProperties />;
        }
        default: {
            return (
                <Typography
                    sx={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    아직 개발중 입니다.
                </Typography>
            );
        }
    }
};

export default () => {
    const { selectedResource } = useNCloud();

    if (!selectedResource) return;

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
                {PropertiesFactory(selectedResource.type)}
            </Toolbar>
        </AppBar>
    );
};
