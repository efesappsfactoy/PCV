import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';

describe('Usuarios Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsuarioController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: UsuarioController = module.get<UsuarioController>(UsuarioController);
    expect(controller).toBeDefined();
  });
});
