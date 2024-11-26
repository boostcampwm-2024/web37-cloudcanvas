import { Test, TestingModule } from '@nestjs/testing';
import { PrivateArchitectureService } from '../private-architecture.service';
import { PrivateArchitectureRepository } from '../private-architecture.repository';
import { vi } from 'vitest';
import { CreatePrivateDto } from '../dto/create-private.dto';
import { UpdatePrivateDto } from '../dto/update-private.dto';
import { NotFoundException } from '@nestjs/common';

describe('PrivateService', () => {
    let service: PrivateArchitectureService;
    let repository: PrivateArchitectureRepository;

    const mockUserId = 1;
    const mockArchitectureId = 1;

    const PRIVATE_ARCHITECTURES = 'PRIVATE_ARCHITECTURES';
    const CREATED_ARCHITECTURE = 'CREATED_ARCHITECTURE';
    const PRIVATE_ARCHITECTURE = 'PRIVATE_ARCHITECTURE';
    const UPDATED_ARCHITECTURE = 'UPDATED_ARCHITECTURE';
    const DELETED_ARCHITECTURE = 'DELETED_ARCHITECTURE';

    const mockRepository = {
        findAll: vi.fn().mockResolvedValue(PRIVATE_ARCHITECTURES),
        create: vi.fn().mockResolvedValue(CREATED_ARCHITECTURE),
        findById: vi.fn().mockResolvedValue(PRIVATE_ARCHITECTURE),
        update: vi.fn().mockResolvedValue(UPDATED_ARCHITECTURE),
        delete: vi.fn().mockResolvedValue(DELETED_ARCHITECTURE),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrivateArchitectureService,
                {
                    provide: PrivateArchitectureRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<PrivateArchitectureService>(
            PrivateArchitectureService,
        );
        repository = module.get<PrivateArchitectureRepository>(
            PrivateArchitectureRepository,
        );
    });

    it('PrivateService는 정상적으로 정의되어야 한다.', () => {
        expect(service).toBeDefined();
    });

    describe('getPrivateArchitectures', () => {
        it('사용자의 아키텍처 목록을 반환해야 한다.', async () => {
            const result = await service.getPrivateArchitectures(mockUserId);

            expect(repository.findAll).toHaveBeenCalledWith(mockUserId);
            expect(result).toEqual(PRIVATE_ARCHITECTURES);
        });
    });

    describe('createPrivateArchitecture', () => {
        it('사용자의 아키텍처를 생성해야 한다.', async () => {
            const dto = new CreatePrivateDto();

            const result = await service.createPrivateArchitecture(
                mockUserId,
                dto,
            );

            expect(repository.create).toHaveBeenCalledWith(mockUserId, dto);
            expect(result).toEqual(CREATED_ARCHITECTURE);
        });
    });

    describe('getPrivateArchitecture', () => {
        it('아키텍처 id에 해당하는 아키텍처를 반환해야 한다.', async () => {
            const result =
                await service.getPrivateArchitecture(mockArchitectureId);

            expect(repository.findById).toHaveBeenCalledWith(
                mockArchitectureId,
            );
            expect(result).toEqual(PRIVATE_ARCHITECTURE);
        });

        it('조회된 아키텍처가 없으면 에러가 발생해야 한다.', async () => {
            mockRepository.findById.mockResolvedValueOnce(undefined);

            await expect(
                service.getPrivateArchitecture(mockArchitectureId),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('updatePrivateArchitecture', () => {
        it('아키텍처 id에 해당하는 아키텍처를 수정해야 한다.', async () => {
            const dto = new UpdatePrivateDto();

            const result = await service.updatePrivateArchitecture(
                mockArchitectureId,
                dto,
            );

            expect(repository.update).toHaveBeenCalledWith(
                mockArchitectureId,
                dto,
            );
            expect(result).toEqual(UPDATED_ARCHITECTURE);
        });

        it('수정할 아키텍처가 없으면 에러가 발생해야 한다.', async () => {
            const dto = new UpdatePrivateDto();
            mockRepository.update.mockRejectedValueOnce(
                new NotFoundException(),
            );

            await expect(
                service.updatePrivateArchitecture(mockArchitectureId, dto),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('deletePrivateArchitecture', () => {
        it('아키텍처 id에 해당하는 아키텍처를 삭제해야 한다.', async () => {
            const result =
                await service.deletePrivateArchitecture(mockArchitectureId);

            expect(repository.delete).toHaveBeenCalledWith(mockArchitectureId);
            expect(result).toEqual(DELETED_ARCHITECTURE);
        });

        it('삭제할 아키텍처가 없으면 에러가 발생해야 한다.', async () => {
            mockRepository.delete.mockRejectedValueOnce(
                new NotFoundException(),
            );

            await expect(
                service.deletePrivateArchitecture(mockArchitectureId),
            ).rejects.toThrow(NotFoundException);
        });
    });
});
