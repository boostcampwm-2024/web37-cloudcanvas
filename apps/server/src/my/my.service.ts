import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParamsDto } from 'src/types/query-params.dto';
import { buildQueryOptions } from 'src/utils/build-query-options';

@Injectable()
export class MyService {
    constructor(private readonly prisma: PrismaService) {}

    async findMyPrivateArchitectures(queryParams: QueryParamsDto) {
        return this.prisma.privateArchitecture.findMany({
            ...buildQueryOptions(queryParams),
        });
    }

    async findMyPublicArchitectures(queryParams: QueryParamsDto) {
        return this.prisma.publicArchitecture.findMany({
            include: {
                author: true,
                _count: {
                    select: {
                        stars: true,
                        imports: true,
                    },
                },
            },
            ...buildQueryOptions(queryParams),
        });
    }

    async findMyStars(queryParams: QueryParamsDto) {
        return this.prisma.publicArchitecture.findMany({
            include: {
                author: true,
                _count: {
                    select: {
                        stars: true,
                        imports: true,
                    },
                },
            },
            ...buildQueryOptions(queryParams),
        });
    }
}
