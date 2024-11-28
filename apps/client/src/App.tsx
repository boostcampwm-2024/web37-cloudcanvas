import CloudGraph from '@/src/CloudGraph';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
import NetworksBar from '@components/NCloud/NetworksBar/index';
import PropertiesBar from '@components/NCloud/PropertiesBar';
import usePost from '@hooks/usePost';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

function App() {
    const { data, postData } = usePost(
        'https://api.cloudcanvas.kro.kr/auth/login',
    );
    console.log(data);
    useEffect(() => {
        postData({});
    }, []);
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
            <PropertiesBar />
        </>
    );
}

export default App;
