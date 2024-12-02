const BASE_URL = import.meta.env.VITE_API_URL;
export const URLS = {
    login: 'auth/login',
    privateArchi: (id: string) => `private-architectures/${id}`,
};
export const urls = (path: keyof typeof URLS, slug?: any) => {
    const urls = URLS[path];
    if (typeof urls === 'function') {
        return `${BASE_URL}/${urls(slug)}`;
    }

    return `${BASE_URL}/${urls}`;
};
