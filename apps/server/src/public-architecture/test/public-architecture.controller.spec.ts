import { Test } from '@nestjs/testing';
import { PublicArchitectureController } from '../public-architecture.controller';
import { PublicArchitectureService } from '../public-architecture.service';
import { NotFoundException } from '@nestjs/common';
import { vi } from 'vitest';

describe('PublicController', () => {
    let controller: PublicArchitectureController;
    let service: any;

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
        const serviceMock = {
            getPublicArchitectures: vi.fn(),
            getPublicArchitecture: vi.fn(),
            createPublicArchitecture: vi.fn(),
            updatePublicArchitecture: vi.fn(),
            deletePublicArchitecture: vi.fn(),
        };

        const module = await Test.createTestingModule({
            controllers: [PublicArchitectureController],
            providers: [
                {
                    provide: PublicArchitectureService,
                    useValue: serviceMock,
                },
            ],
        }).compile();

        controller = module.get<PublicArchitectureController>(
            PublicArchitectureController,
        );
        service = module.get(PublicArchitectureService);
    });

    describe('getPublicArchitectures', () => {
        it('should return all architectures', async () => {
            service.getPublicArchitectures.mockReturnValue([mockArchitecture]);

            const result = await controller.getPublicArchitectures();

            expect(result).toEqual([mockArchitecture]);
            expect(service.getPublicArchitectures).toHaveBeenCalled();
        });
    });

    describe('getPublicArchitecture', () => {
        it('should return an architecture by id', async () => {
            service.getPublicArchitecture.mockReturnValue(mockArchitecture);

            const result = await controller.getPublicArchitecture(1);

            expect(result).toEqual(mockArchitecture);
            expect(service.getPublicArchitecture).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when not found', async () => {
            service.getPublicArchitecture.mockRejectedValue(
                new NotFoundException(),
            );

            await expect(controller.getPublicArchitecture(1)).rejects.toThrow(
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
            service.createPublicArchitecture.mockReturnValue(mockArchitecture);

            const result = await controller.createPublicArchitecture(createDto);

            expect(result).toEqual(mockArchitecture);
            expect(service.createPublicArchitecture).toHaveBeenCalledWith(
                1,
                createDto,
            );
        });
    });

    describe('updatePublicArchitecture', () => {
        const updateDto = { title: 'Updated' };

        it('should update an architecture', async () => {
            service.updatePublicArchitecture.mockReturnValue({
                ...mockArchitecture,
                ...updateDto,
            });

            const result = await controller.updatePublicArchitecture(
                1,
                updateDto,
            );

            expect(result.title).toBe('Updated');
            expect(service.updatePublicArchitecture).toHaveBeenCalledWith(
                1,
                updateDto,
            );
        });
    });

    describe('deletePublicArchitecture', () => {
        it('should delete an architecture', async () => {
            service.deletePublicArchitecture.mockReturnValue(mockArchitecture);

            const result = await controller.deletePublicArchitecture(1);

            expect(result).toEqual(mockArchitecture);
            expect(service.deletePublicArchitecture).toHaveBeenCalledWith(1);
        });
    });
});
