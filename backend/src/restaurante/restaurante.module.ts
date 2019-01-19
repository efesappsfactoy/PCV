import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante/restaurante.service';

@Module({
  providers: [RestauranteService]
})
export class RestauranteModule {}
