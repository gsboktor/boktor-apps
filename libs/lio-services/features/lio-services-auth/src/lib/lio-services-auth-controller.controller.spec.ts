import { Test, TestingModule } from '@nestjs/testing';
import { LioServicesAuthController } from './lio-services-auth.controller';

describe('LioServicesAuthControllerController', () => {
  let controller: LioServicesAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LioServicesAuthController],
    }).compile();

    controller = module.get<LioServicesAuthController>(LioServicesAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
