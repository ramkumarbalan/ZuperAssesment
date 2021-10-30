import { Test, TestingModule } from '@nestjs/testing';
import { EmpActivityService } from './emp-activity.service';

describe('EmpActivityService', () => {
  let service: EmpActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpActivityService],
    }).compile();

    service = module.get<EmpActivityService>(EmpActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
