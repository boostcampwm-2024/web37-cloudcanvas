import { Test, TestingModule } from '@nestjs/testing';
import { CloudsService } from './clouds.service';

describe('CloudsService', () => {
  let service: CloudsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudsService],
    }).compile();

    service = module.get<CloudsService>(CloudsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
