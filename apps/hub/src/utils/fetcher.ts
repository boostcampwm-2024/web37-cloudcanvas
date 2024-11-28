export const fetcher = async (url: string) => {
    const res = await fetch(url, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data;
};
