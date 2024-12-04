import { Test, TestingModule } from '@nestjs/testing';
import { CloudService } from './cloud.service';

describe('CloudService', () => {
    let service: CloudService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CloudService],
        }).compile();

        service = module.get<CloudService>(CloudService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
