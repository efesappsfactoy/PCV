import {Module} from '@nestjs/common';
import {RestauranteService} from './restaurante.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RestauranteController} from './restaurante.controller';
import {RestauranteEntity} from './restaurante.entity';

@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    RestauranteEntity
                ])
    ],
    controllers: [RestauranteController],
    providers: [RestauranteService],
    exports: [RestauranteService]
})
export class RestauranteModule {
}