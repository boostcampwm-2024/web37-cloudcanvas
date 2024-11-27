import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { QueryParamsDto } from '../types/query-params.dto.js';
import { buildQueryOptions } from '../utils/build-query-options.js';

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
