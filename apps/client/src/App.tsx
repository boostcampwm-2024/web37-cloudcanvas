import CloudGraph from '@/src/CloudGraph';
import NetworksBar from '@components/NCloud/NetworksBar/index';
import PropertiesBar from '@components/NCloud/PropertiesBar';

export const App = () => {
    return (
        <>
            <CloudGraph />
            <NetworksBar />
            <PropertiesBar />
        </>
    );
};
