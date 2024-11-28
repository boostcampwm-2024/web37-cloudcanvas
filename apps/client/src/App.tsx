import CloudGraph from '@/src/CloudGraph';
// import ErrorBoundary from '@components/ErrorBoundary';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
import NetworksBar from '@components/NCloud/NetworksBar/index';
import Box from '@mui/material/Box';

function App() {
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
                    <CloudGraph />
                </Box>
            </Box>

            <NetworksBar />
        </>
    );
}

export default App;
