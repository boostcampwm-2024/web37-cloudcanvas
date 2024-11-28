import { useState } from 'react';

type State<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    postData: (body: any) => Promise<void>;
};

const usePost = <T>(url: string): State<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const postData = async (body: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                credentials: 'include',
                // body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Error posting data');
            }

            const responseData = await response.json();
            setData(responseData);
        } catch (err: any) {
            setError(err.message || 'Unexpected Error');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData };
};

export default usePost;
