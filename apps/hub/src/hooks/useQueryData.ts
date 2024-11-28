import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

export const useQueryData = (
    apiUrl: string,
    params: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
    },
) => {
    const buildUrl = () => {
        const searchParams = new URLSearchParams();
        searchParams.append('page', params.page?.toString() ?? '1');
        searchParams.append('limit', params.limit?.toString() ?? '10');
        if (params.search) searchParams.append('search', params.search);
        if (params.sort) searchParams.append('sort', params.sort);
        if (params.order) searchParams.append('order', params.order);
        return `${apiUrl}?${searchParams.toString()}`;
    };

    const { data, error, isLoading, mutate } = useSWR(buildUrl, fetcher);

    return {
        data: data?.data ?? [],
        total: data?.total ?? 0,
        isLoading,
        error,
        mutate,
    };
};
