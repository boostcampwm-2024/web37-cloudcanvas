import { QueryParamsDto } from 'src/types/query-params.dto';

export const buildQueryOptions = ({
    page,
    limit,
    search,
    sort,
    order,
    userId,
}: QueryParamsDto & { userId?: number }) => {
    return {
        skip: (page - 1) * limit,
        take: limit,
        where:
            search || userId
                ? {
                      title: {
                          contains: search,
                      },
                      authorId: userId,
                  }
                : undefined,
        orderBy: sort
            ? {
                  [sort]: order,
              }
            : {
                  createdAt: 'desc',
              },
    } as any;
};
