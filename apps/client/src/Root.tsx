import { useLoaderData } from 'react-router-dom';
import CloudGraphProvider from '@components/CloudGraphProvider';
import Layout from '@components/Layout';

function Root() {
    const loader = useLoaderData();

    return (
        <CloudGraphProvider initialData={loader?.data}>
            <Layout />
        </CloudGraphProvider>
    );
}

export default Root;
