import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const getQueryParams = useCallback(() => {
        return {
            page: Number(searchParams.get('page')) || 1,
            limit: Number(searchParams.get('limit')) || 10,
            search: searchParams.get('search') || '',
            sort: searchParams.get('sort') || '',
            order: searchParams.get('order') || '',
        };
    }, [searchParams]);

    const setQueryParams = useCallback(
        (newParams: Record<string, string | number>) => {
            const current = new URLSearchParams(searchParams.toString());
            Object.entries(newParams).forEach(([key, value]) => {
                if (value) {
                    current.set(key, String(value));
                } else {
                    current.delete(key);
                }
            });
            router.push(`?${current.toString()}`);
        },
        [router, searchParams],
    );

    return {
        params: getQueryParams(),
        setParams: setQueryParams,
    };
};
