export const URLS = {
    login: 'auth/login',
    privateArchi: (id: string) => `private-architectures/${id}`,
};
export const urls = (domain: string, path: keyof typeof URLS, slug?: any) => {
    const urls = URLS[path];
    if (typeof urls === 'function') {
        return `${domain}/${urls(slug)}`;
    }

    return `${domain}/${urls}`;
};
