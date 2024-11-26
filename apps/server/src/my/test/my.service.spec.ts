import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from '../my.service';

describe('MyService', () => {
    let service: MyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MyService],
        }).compile();

        service = module.get<MyService>(MyService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
