import { Test, TestingModule } from '@nestjs/testing';
import { EmpActivityController } from './emp-activity.controller';

describe('EmpActivityController', () => {
  let controller: EmpActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpActivityController],
    }).compile();

    controller = module.get<EmpActivityController>(EmpActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
