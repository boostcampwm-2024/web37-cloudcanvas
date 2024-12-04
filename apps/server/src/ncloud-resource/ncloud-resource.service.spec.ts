import { Test, TestingModule } from '@nestjs/testing';
import { NcloudResourcesService } from './ncloud-resource.service';

describe('NcloudResourcesService', () => {
    let service: NcloudResourcesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NcloudResourcesService],
        }).compile();

        service = module.get<NcloudResourcesService>(NcloudResourcesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
