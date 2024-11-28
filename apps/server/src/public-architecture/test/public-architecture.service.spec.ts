import { Test } from '@nestjs/testing';
import { PublicArchitectureService } from '../public-architecture.service';
import { PublicArchitectureRepository } from '../public-architecture.repository';
import { NotFoundException } from '@nestjs/common';
import { vi } from 'vitest';

describe('PublicService', () => {
    let service: PublicArchitectureService;
    let repository: any;

    const mockArchitecture = {
        id: 1,
        title: 'Test',
        architecture: {},
        cost: 100,
        tag: ['test'],
        authorId: 1,
        createdAt: new Date(),
        author: {
            id: 1,
            name: 'Test User',
        },
        _count: {
            stars: 0,
            imports: 0,
        },
    };

    beforeEach(async () => {
        const repositoryMock = {
            findAll: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };

        const module = await Test.createTestingModule({
            providers: [
                PublicArchitectureService,
                {
                    provide: PublicArchitectureRepository,
                    useValue: repositoryMock,
                },
            ],
        }).compile();

        service = module.get<PublicArchitectureService>(
            PublicArchitectureService,
        );
        repository = module.get(PublicArchitectureRepository);
    });

    describe('getPublicArchitectures', () => {
        it('should return all architectures', async () => {
            repository.findAll.mockReturnValue([mockArchitecture]);

            const result = await service.findArchitectures();

            expect(result).toEqual([mockArchitecture]);
            expect(repository.findAll).toHaveBeenCalled();
        });
    });

    describe('getPublicArchitecture', () => {
        it('should return an architecture by id', async () => {
            repository.findById.mockReturnValue(mockArchitecture);

            const result = await service.findArchitecture(1);

            expect(result).toEqual(mockArchitecture);
            expect(repository.findById).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when not found', async () => {
            repository.findById.mockReturnValue(null);

            await expect(service.findArchitecture(1)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('createPublicArchitecture', () => {
        const createDto = {
            title: 'Test',
            architecture: {},
            cost: 100,
            tag: ['test'],
        };

        it('should create an architecture', async () => {
            repository.create.mockReturnValue(mockArchitecture);

            const result = await service.saveArchitecture(1, createDto);

            expect(result).toEqual(mockArchitecture);
            expect(repository.create).toHaveBeenCalledWith(1, createDto);
        });
    });

    describe('updatePublicArchitecture', () => {
        const updateDto = { title: 'Updated' };

        it('should update an architecture', async () => {
            repository.findById.mockReturnValue(mockArchitecture);
            repository.update.mockReturnValue({
                ...mockArchitecture,
                ...updateDto,
            });

            const result = await service.modifyArchitecture(1, updateDto);

            expect(result.title).toBe('Updated');
            expect(repository.update).toHaveBeenCalledWith(1, updateDto);
        });

        it('should throw NotFoundException when not found', async () => {
            repository.findById.mockReturnValue(null);

            await expect(
                service.modifyArchitecture(1, updateDto),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('deletePublicArchitecture', () => {
        it('should delete an architecture', async () => {
            repository.findById.mockReturnValue(mockArchitecture);
            repository.delete.mockReturnValue(mockArchitecture);

            const result = await service.removeArchitecture(1);

            expect(result).toEqual(mockArchitecture);
            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });
});
