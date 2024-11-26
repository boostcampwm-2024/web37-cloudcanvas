import { mockFetch } from '@/mocks/architectures';

export interface ArchitectureQueryParams {
    page?: number;
    search?: string;
    sort?: string;
    order?: string;
}

export const fetchArchitectures = async (params: ArchitectureQueryParams) => {
    const response = await mockFetch(params);
    return response;
};
