import { Test, TestingModule } from '@nestjs/testing';
import { MyController } from '../my.controller';
import { MyService } from '../my.service';

describe('MyController', () => {
    let controller: MyController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MyController],
            providers: [MyService],
        }).compile();

        controller = module.get<MyController>(MyController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
