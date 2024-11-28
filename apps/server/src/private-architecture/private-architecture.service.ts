import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service.js';
import { FindArchitectureDto } from './dto/find-architecture.dto.js';
import { FindVersionDto } from './dto/find-version.dto.js';
import { FindVersionsDto } from './dto/find-versions.dto.js';
import { ModifyArchitectureDto } from './dto/modify-architecture.dto.js';
import { RemoveArchitectureDto } from './dto/remove-architecture.dto.js';
import { RemoveVersionDto } from './dto/remove-version.dto.js';
import { SaveArchitectureDto } from './dto/save-architecture.dto.js';
import { SaveVersionDto } from './dto/save-version.dto.js';

@Injectable()
export class PrivateArchitectureService {
    constructor(private readonly prisma: PrismaService) {}

    saveArchitecture({
        title,
        userId: authorId,
        architecture,
        cost,
    }: SaveArchitectureDto) {
        return this.prisma.privateArchitecture.create({
            data: {
                title,
                authorId,
                architecture,
                cost,
            },
        });
    }

    async findArchitecture({ id, userId: authorId }: FindArchitectureDto) {
        const privateArchitecture =
            await this.prisma.privateArchitecture.findUnique({
                select: {
                    title: true,
                    architecture: true,
                    createdAt: true,
                    updatedAt: true,
                    cost: true,
                },
                where: {
                    id,
                    authorId,
                },
            });
        if (!privateArchitecture) throw new ForbiddenException();
        return privateArchitecture;
    }

    async modifyArchitecture({
        id,
        userId: authorId,
        title,
        architecture,
        cost,
    }: ModifyArchitectureDto) {
        const isAuthor = await this.isArchitectureAuthor(id, authorId);
        if (!isAuthor) throw new ForbiddenException();
        return this.prisma.privateArchitecture.update({
            where: {
                id,
                authorId,
            },
            data: {
                title,
                architecture,
                cost,
            },
        });
    }

    async removeArchitecture({ id, userId: authorId }: RemoveArchitectureDto) {
        const isAuthor = await this.isArchitectureAuthor(id, authorId);
        if (!isAuthor) throw new ForbiddenException();
        return await this.prisma.$transaction(async (tx) => {
            await tx.version.deleteMany({
                where: {
                    privateArchitectureId: id,
                },
            });
            return tx.privateArchitecture.delete({
                where: {
                    id,
                    authorId,
                },
            });
        });
    }

    async findVersions({ id, userId: authorId }: FindVersionsDto) {
        const isAuthor = await this.isArchitectureAuthor(id, authorId);
        if (!isAuthor) throw new ForbiddenException();
        return await this.prisma.version.findMany({
            select: {
                id: true,
                title: true,
                createdAt: true,
            },
            where: {
                privateArchitectureId: id,
            },
        });
    }

    async saveVersion({
        id,
        userId: authorId,
        title,
        architecture,
        cost,
    }: SaveVersionDto) {
        const isAuthor = await this.isArchitectureAuthor(id, authorId);
        if (!isAuthor) throw new ForbiddenException();
        return this.prisma.version.create({
            data: {
                privateArchitectureId: id,
                title,
                architecture,
                cost,
            },
        });
    }

    async removeVersion({ userId: authorId, id, versionId }: RemoveVersionDto) {
        const isAuthor = await this.isArchitectureAuthor(id, authorId);
        if (!isAuthor) throw new ForbiddenException();
        const privateArchitectureVersion = await this.prisma.version.findUnique(
            {
                where: {
                    id: versionId,
                },
            },
        );
        if (!privateArchitectureVersion) throw new ForbiddenException();
        return this.prisma.version.delete({
            where: {
                id: versionId,
            },
        });
    }

    async findVersion({ userId: authorId, id, versionId }: FindVersionDto) {
        const isAuthor = await this.isArchitectureAuthor(id, authorId);
        if (!isAuthor) throw new ForbiddenException();
        const privateArchitectureVersion = await this.prisma.version.findUnique(
            {
                select: {
                    architecture: true,
                },
                where: {
                    id: versionId,
                },
            },
        );
        if (!privateArchitectureVersion) throw new ForbiddenException();
        return privateArchitectureVersion;
    }

    async isArchitectureAuthor(id: number, authorId: number): Promise<boolean> {
        return !!(await this.prisma.privateArchitecture.findUnique({
            select: { id: true },
            where: { id, authorId },
        }));
    }
}
