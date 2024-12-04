import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    buildFilterOptions,
    buildPaginationOptions,
    buildSortOptions,
} from 'src/utils/build-query-options';
import { FindArchitecturesDto } from './dto/find-architectures.dto';
import { SaveArchitectureDto } from './dto/save-architecture.dto';
import { FindArchitectureDto } from './dto/find-architecture.dto';
import { ModifyArchitectureDto } from './dto/modify-architecture.dto';
import { RemoveArchitectureDto } from './dto/remove-architecture.dto';
import { UnstarDto } from './dto/unstar.dto';
import { StarDto } from './dto/star.dto';
import { ImportDto } from './dto/import.dto';
import { CloudService } from 'src/cloud/cloud.service';

@Injectable()
export class PublicArchitectureService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly cloud: CloudService,
    ) {}

    async findArchitectures(queryParams: FindArchitecturesDto) {
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

    async saveArchitecture({
        title,
        architecture,
        tags,
        userId: authorId,
    }: SaveArchitectureDto) {
        const cost = await this.cloud.calculatePrice(architecture?.nodes);
        return this.prisma.publicArchitecture.create({
            data: {
                title,
                architecture,
                cost: cost.totalMonthPrice,
                authorId,
                tags: {
                    create: tags.map((name) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name },
                                create: { name },
                            },
                        },
                    })),
                },
            },
        });
    }

    findArchitecture({ id, userId }: FindArchitectureDto) {
        return this.prisma.publicArchitecture.findUniqueOrThrow({
            where: { id },
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
                stars: userId
                    ? {
                          where: {
                              userId,
                          },
                      }
                    : undefined,
                _count: {
                    select: {
                        stars: true,
                        imports: true,
                    },
                },
            },
        });
    }

    modifyArchitecture({ id, userId: authorId, title }: ModifyArchitectureDto) {
        return this.prisma.publicArchitecture.update({
            where: { id, authorId },
            data: { title },
        });
    }

    async removeArchitecture({ id, userId: authorId }: RemoveArchitectureDto) {
        return this.prisma.$transaction(async (tx) => {
            await tx.publicArchitecture.findUniqueOrThrow({
                select: { id: true },
                where: { id, authorId },
            });
            await tx.publicArchitectureTag.deleteMany({
                where: { publicArchitectureId: id },
            });
            await tx.star.deleteMany({ where: { publicArchitectureId: id } });
            await tx.import.deleteMany({ where: { publicArchitectureId: id } });
            return await tx.publicArchitecture.delete({ where: { id } });
        });
    }

    findStar({ id, userId }: StarDto) {
        return this.prisma.star.findUnique({
            where: {
                unique_star: {
                    publicArchitectureId: id,
                    userId,
                },
            },
        });
    }

    star({ id, userId }: StarDto) {
        return this.prisma.star.create({
            data: {
                publicArchitectureId: id,
                userId,
            },
        });
    }

    unstar({ id, userId }: UnstarDto) {
        return this.prisma.star.delete({
            where: {
                unique_star: {
                    publicArchitectureId: id,
                    userId,
                },
            },
        });
    }

    async import({ id, userId }: ImportDto) {
        const { title, architecture, cost } =
            await this.prisma.publicArchitecture.findUniqueOrThrow({
                select: {
                    title: true,
                    architecture: true,
                    cost: true,
                },
                where: { id },
            });

        const [privateArchitecture] = await this.prisma.$transaction([
            this.prisma.privateArchitecture.create({
                data: {
                    title,
                    architecture,
                    cost,
                    authorId: userId,
                },
            }),
            this.prisma.import.create({
                data: {
                    publicArchitectureId: id,
                    userId,
                },
            }),
        ]);

        return privateArchitecture;
    }
}
