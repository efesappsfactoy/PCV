import {Module} from '@nestjs/common';
import {PedidoController} from './pedido.controller';
import {PedidoService} from './pedido.service';
import {PedidoEntity} from './pedido.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [PedidoEntity]
            )
    ],
    controllers: [PedidoController],
    providers: [PedidoService],
    exports: [PedidoService]
})
export class PedidoModule {
}
