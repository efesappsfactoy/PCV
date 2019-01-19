import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';

describe('Pedidos Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PedidosController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PedidosController = module.get<PedidosController>(PedidosController);
    expect(controller).toBeDefined();
  });
});
