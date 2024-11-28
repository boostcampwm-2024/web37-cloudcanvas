import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { buildPaginationOptions } from 'src/utils/build-query-options';
import { FindMyArchitecturesDto } from './dto/find-my-architectures.dto';
import { buildFilterOptions } from 'src/utils/build-query-options';
import { buildSortOptions } from 'src/utils/build-query-options';

@Injectable()
export class MyService {
    constructor(private readonly prisma: PrismaService) {}

    async findMyPrivateArchitectures(queryParams: FindMyArchitecturesDto) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.privateArchitecture.findMany({
                ...buildPaginationOptions(queryParams),
                ...buildSortOptions(queryParams),
                ...buildFilterOptions(queryParams),
            }),
            this.prisma.privateArchitecture.count({
                ...buildFilterOptions(queryParams),
            }),
        ]);
        return { data, total };
    }

    async findMyPublicArchitectures(queryParams: FindMyArchitecturesDto) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.publicArchitecture.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: {
                            stars: true,
                            imports: true,
                        },
                    },
                },
                ...buildPaginationOptions(queryParams),
                ...buildSortOptions(queryParams),
                ...buildFilterOptions(queryParams),
            }),
            this.prisma.publicArchitecture.count({
                ...buildFilterOptions(queryParams),
            }),
        ]);
        return { data, total };
    }

    async findMyStars(queryParams: FindMyArchitecturesDto) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.publicArchitecture.findMany({
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                    _count: {
                        select: {
                            stars: true,
                            imports: true,
                        },
                    },
                },
                ...buildPaginationOptions(queryParams),
                ...buildSortOptions(queryParams),
                where: {
                    stars: {
                        some: {
                            userId: queryParams.userId,
                        },
                    },
                    title: queryParams.search
                        ? { contains: queryParams.search }
                        : undefined,
                },
            }),
            this.prisma.publicArchitecture.count({
                where: {
                    stars: {
                        some: {
                            userId: queryParams.userId,
                        },
                    },
                    title: queryParams.search
                        ? { contains: queryParams.search }
                        : undefined,
                },
            }),
        ]);
        return { data, total };
    }
}
