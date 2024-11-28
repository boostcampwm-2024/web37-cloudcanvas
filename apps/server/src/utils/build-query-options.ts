import { QueryParamsDto } from 'src/types/query-params.dto.js';

export const buildPaginationOptions = ({ page, limit }: QueryParamsDto) => {
    return {
        skip: (page - 1) * limit,
        take: limit,
    } as any;
};

export const buildSortOptions = ({ sort, order }: QueryParamsDto) => {
    if (sort === 'name') {
        return {
            orderBy: {
                title: order,
            },
        };
    } else if (sort === 'cost') {
        return {
            orderBy: {
                cost: order,
            },
        };
    } else if (sort === 'stars' || sort === 'imports') {
        return {
            orderBy: {
                [sort]: {
                    _count: order,
                },
            },
        };
    }
};

export const buildFilterOptions = ({
    search,
    userId,
}: {
    search?: string;
    userId?: number;
}) => {
    return {
        where:
            search || userId
                ? {
                      title: {
                          contains: search,
                      },
                      authorId: userId,
                  }
                : undefined,
    };
};
