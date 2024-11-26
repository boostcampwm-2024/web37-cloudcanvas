import { mockFetch } from '@/mocks/architectures';

export const fetcher = async (url: string) => {
    const res = await mockFetch(url);
    // if (!res.ok) throw new Error('Failed to fetch data');
    // return res.json();
    return res;
};
