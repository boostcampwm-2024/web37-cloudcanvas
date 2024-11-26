import { Test, TestingModule } from '@nestjs/testing';
import { PrivateArchitectureController } from '../private-architecture.controller';
import { PrivateArchitectureService } from '../private-architecture.service';
import { vi } from 'vitest';
import { CreatePrivateDto } from '../dto/create-private.dto';
import { UpdatePrivateDto } from '../dto/update-private.dto';

describe('PrivateController', () => {
    let controller: PrivateArchitectureController;
    let service: PrivateArchitectureService;

    const mockUserId = 1;

    const PRIVATE_ARCHITECTURES = 'PRIVATE_ARCHITECTURES';
    const CREATED_ARCHITECTURE = 'CREATED_ARCHITECTURE';
    const PRIVATE_ARCHITECTURE = 'PRIVATE_ARCHITECTURE';
    const UPDATED_ARCHITECTURE = 'UPDATED_ARCHITECTURE';
    const DELETED_ARCHITECTURE = 'DELETED_ARCHITECTURE';

    const mockPrivateService = {
        getPrivateArchitectures: vi
            .fn()
            .mockResolvedValue(PRIVATE_ARCHITECTURES),
        createPrivateArchitecture: vi
            .fn()
            .mockResolvedValue(CREATED_ARCHITECTURE),
        getPrivateArchitecture: vi.fn().mockResolvedValue(PRIVATE_ARCHITECTURE),
        updatePrivateArchitecture: vi
            .fn()
            .mockResolvedValue(UPDATED_ARCHITECTURE),
        deletePrivateArchitecture: vi
            .fn()
            .mockResolvedValue(DELETED_ARCHITECTURE),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PrivateArchitectureController],
            providers: [
                {
                    provide: PrivateArchitectureService,
                    useValue: mockPrivateService,
                },
            ],
        }).compile();

        controller = module.get<PrivateArchitectureController>(
            PrivateArchitectureController,
        );
        service = module.get<PrivateArchitectureService>(
            PrivateArchitectureService,
        );
    });

    it('PrivateController는 정상적으로 정의되어야 한다.', () => {
        expect(controller).toBeDefined();
    });

    describe('GET /architectures/private', () => {
        it('인증된 사용자일 경우 사용자의 아키텍처 목록을 반환해야 한다. ', async () => {
            const result = await controller.getPrivateArchitectures(mockUserId);

            expect(service.getPrivateArchitectures).toHaveBeenCalledWith(
                mockUserId,
            );
            expect(result).toEqual(PRIVATE_ARCHITECTURES);
        });
    });

    describe('POST /architectures/private', () => {
        it('인증된 사용자일 경우 아키텍처를 생성하고 생성된 값을 반환해야 한다.', async () => {
            const dto = new CreatePrivateDto();

            const result = await controller.createPrivateArchitecture(
                mockUserId,
                dto,
            );

            expect(service.createPrivateArchitecture).toHaveBeenCalledWith(
                mockUserId,
                dto,
            );
            expect(result).toEqual(CREATED_ARCHITECTURE);
        });
    });

    describe('GET /architectures/private/:id', () => {
        it('인증된 사용자가 아키텍처의 소유자일 경우 해당 아키텍처를 반환해야 한다.', async () => {
            const id = 1;

            const result = await controller.getPrivateArchitecture(id);

            expect(service.getPrivateArchitecture).toHaveBeenCalledWith(id);
            expect(result).toEqual(PRIVATE_ARCHITECTURE);
        });
    });

    describe('PATCH /architectures/private/:id', () => {
        it('인증된 사용자가 아키텍처의 소유자일 경우 데이터를 수정하고 결과를 반환해야 한다.', async () => {
            const id = 1;
            const dto = new UpdatePrivateDto();

            const result = await controller.updatePrivateArchitecture(id, dto);

            expect(service.updatePrivateArchitecture).toHaveBeenCalledWith(
                id,
                dto,
            );
            expect(result).toEqual(UPDATED_ARCHITECTURE);
        });
    });

    describe('DELETE /architectures/private/:id', () => {
        it('인증된 사용자가 아키텍처의 소유자일 경우 데이터를 삭제하고 결과를 반환해야 한다.', async () => {
            const id = 1;

            const result = await controller.deletePrivateArchitecture(id);

            expect(service.deletePrivateArchitecture).toHaveBeenCalledWith(id);
            expect(result).toEqual(DELETED_ARCHITECTURE);
        });
    });
});
