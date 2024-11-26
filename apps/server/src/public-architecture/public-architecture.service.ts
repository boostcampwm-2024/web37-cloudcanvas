import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicArchitectureDto } from './dto/create-public-architecture.dto';
import { UpdatePublicArchitectureDto } from './dto/update-public-architecture.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParamsDto } from 'src/types/query-params.dto';

@Injectable()
export class PublicArchitectureService {
    constructor(private readonly prisma: PrismaService) {}

    async getMany(query: QueryParamsDto) {
        const { page, limit, search, sort, order } = query;

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
            skip: (page - 1) * limit,
            take: limit,
            where: search
                ? {
                      title: {
                          contains: search,
                      },
                  }
                : undefined,
            orderBy: sort
                ? {
                      [sort]: order,
                  }
                : {
                      createdAt: 'desc',
                  },
        });
    }

    async create(userId: number, dto: CreatePublicArchitectureDto) {
        return await this.prisma.publicArchitecture.create({
            data: {
                ...dto,
                authorId: userId,
            },
            include: {
                author: true,
            },
        });
    }

    async getOne(id: number) {
        const item = await this.prisma.publicArchitecture.findUnique({
            where: { id },
            include: {
                author: true,
                _count: {
                    select: {
                        stars: true,
                        imports: true,
                    },
                },
            },
        });

        if (!item) {
            throw new NotFoundException('Architecture not found');
        }

        return item;
    }

    async update(id: number, userId: number, dto: UpdatePublicArchitectureDto) {
        // #TODO check if user is the author
        return this.prisma.publicArchitecture.update({
            where: { id },
            data: dto,
            include: {
                author: true,
            },
        });
    }

    async delete(id: number, userId: number) {
        // #TODO check if user is the author
        // #TODO delete all stars and imports
        return this.prisma.publicArchitecture.delete({ where: { id } });
    }

    async star(id: number, userId: number) {
        const exists = await this.architectureExists(id);

        if (!exists) {
            throw new NotFoundException('Architecture not found');
        }

        return this.prisma.star.create({
            data: {
                userId,
                publicArchitectureId: id,
            },
        });
    }

    async unstar(id: number, userId: number) {
        const exists = await this.architectureExists(id);

        if (!exists) {
            throw new NotFoundException('Architecture not found');
        }

        return this.prisma.star.delete({
            where: {
                unique_star: {
                    userId,
                    publicArchitectureId: id,
                },
            },
        });
    }

    async import(id: number, userId: number) {
        const exists = await this.architectureExists(id);

        if (!exists) {
            throw new NotFoundException('Architecture not found');
        }

        return this.prisma.import.create({
            data: {
                userId,
                publicArchitectureId: id,
            },
        });
    }

    architectureExists(id: number) {
        return this.prisma.publicArchitecture.findUnique({
            where: { id },
        });
    }
}
