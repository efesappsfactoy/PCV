import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';

describe('Pedidos Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PedidoController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PedidoController = module.get<PedidoController>(PedidoController);
    expect(controller).toBeDefined();
  });
});
