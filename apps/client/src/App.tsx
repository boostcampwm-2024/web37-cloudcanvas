import CloudGraph from '@/src/CloudGraph';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
import NetworksBar from '@components/NCloud/NetworksBar/index';
import PropertiesBar from '@components/NCloud/PropertiesBar';
import { DimensionProvider } from '@contexts/DimensionContext';
import { EdgeProvider } from '@contexts/EdgeContext';
import { GraphProvider } from '@contexts/GraphConetxt';
import { GroupProvider } from '@contexts/GroupContext';
import { NodeProvider } from '@contexts/NodeContext';
import { SelectionProvider } from '@contexts/SelectionContext';
import { SvgProvider } from '@contexts/SvgContext';
import useFetch from '@hooks/useFetch';
import Box from '@mui/material/Box';
import { ReactNode, useLayoutEffect } from 'react';
import { urls } from './apis';

const BASE_URL = import.meta.env.VITE_API_URL;

const CloudGraphProvider = ({ children }: { children: ReactNode }) => {
    const { execute: postLogin } = useFetch(urls(BASE_URL, 'login'), {
        method: 'POST',
    });
    const { data, execute } = useFetch(urls(BASE_URL, 'privateArchi', 1), {
        method: 'GET',
    });

    useLayoutEffect(() => {
        postLogin({});
    }, []);

    console.log(data);

    return (
        <DimensionProvider>
            <SvgProvider>
                <GraphProvider initialZoomFactor={2}>
                    <GroupProvider>
                        <NodeProvider>
                            <EdgeProvider>
                                <SelectionProvider>
                                    {children}
                                </SelectionProvider>
                            </EdgeProvider>
                        </NodeProvider>
                    </GroupProvider>
                </GraphProvider>
            </SvgProvider>
        </DimensionProvider>
    );
};

function App() {
    return (
        <CloudGraphProvider>
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
        </CloudGraphProvider>
    );
}

export default App;
