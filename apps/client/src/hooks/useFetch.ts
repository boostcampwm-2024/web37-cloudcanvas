import { undefinedReplacer } from '@utils';
import { useState, useEffect } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface UseFetchOptions {
    method?: HttpMethod;
    headers?: HeadersInit;
    body?: any;
    trigger?: any;
    credentials?: RequestCredentials;
}

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: (body?: any) => Promise<T | null>;
}

function useFetch<T = any>(
    url: string,
    options: UseFetchOptions = {},
): UseFetchResult<T> {
    const { method = 'GET', headers, body, trigger, credentials } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(method === 'GET');
    const [error, setError] = useState<Error | null>(null);

    const execute = async (executeBody?: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: executeBody
                    ? JSON.stringify(executeBody, undefinedReplacer)
                    : body
                      ? JSON.stringify(body, undefinedReplacer)
                      : null,
                credentials: credentials ?? 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
            }

            const result: T = await response.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (method === 'GET') {
            execute();
        }
    }, [url, method, trigger]);

    return { data, loading, error, execute };
}

export default useFetch;
