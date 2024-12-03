import { LoaderFunctionArgs } from 'react-router-dom';
import { urls } from '.';
import { undefinedReviver } from '@utils';

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

    const text = await archiResponse.text();
    let data;
    try {
        data = JSON.parse(text, undefinedReviver);
    } catch (error) {
        throw new Response('Invalid JSON response', { status: 500 });
    }

    return { data };
};
