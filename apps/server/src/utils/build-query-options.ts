import { QueryParamsDto } from 'src/types/query-params.dto';

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
    }
    if (sort === 'cost') {
        return {
            orderBy: {
                cost: order,
            },
        };
    }
    if (sort === 'stars' || sort === 'imports') {
        return {
            orderBy: {
                [sort]: {
                    _count: order,
                },
            },
        };
    }
    return {
        orderBy: {
            createdAt: 'desc',
        },
    };
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
