import NetworksBar from '@components/NCloud/NetworksBar';
import PropertiesBar from '@components/NCloud/PropertiesBar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default () => {
    return (
        <>
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    <Header />
                    <Outlet />
                </Box>
            </Box>

            <NetworksBar />
            <PropertiesBar />
        </>
    );
};
