import { Test, TestingModule } from '@nestjs/testing';
import { CloudsController } from './clouds.controller';

describe('CloudsController', () => {
    let controller: CloudsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CloudsController],
        }).compile();

        controller = module.get<CloudsController>(CloudsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
