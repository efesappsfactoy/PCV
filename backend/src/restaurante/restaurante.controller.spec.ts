import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteController } from './restaurante.controller';

describe('Restaurante Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RestauranteController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RestauranteController = module.get<RestauranteController>(RestauranteController);
    expect(controller).toBeDefined();
  });
});
