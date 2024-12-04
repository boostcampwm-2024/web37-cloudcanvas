import { LoaderFunctionArgs } from 'react-router-dom';
import { urls } from '.';

export const rootLoader = async ({ params }: LoaderFunctionArgs) => {
    const loginResponse = await fetch(urls('login'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
    });

    if (!loginResponse.ok) {
        throw new Response('Login failed', { status: loginResponse.status });
    }

    if (!params.id) return null;
    const archiResponse = await fetch(urls('privateArchi', params.id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!archiResponse.ok) {
        throw new Response('Data fetch failed', {
            status: archiResponse.status,
        });
    }

    const data = await archiResponse.json();

    return { data };
};
