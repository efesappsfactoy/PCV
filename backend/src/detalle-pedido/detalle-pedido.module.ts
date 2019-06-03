import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DetallePedidoEntity} from './detalle-pedido.entity';

@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [DetallePedidoEntity]
            )
    ]
})
export class DetallePedidoModule {
}
