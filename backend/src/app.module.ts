import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {LoginModule} from './login/login.module';
import {UsuarioModule} from './usuario/usuario.module';
import {PedidoModule} from './pedido/pedido.module';
import {RestauranteModule} from './restaurante/restaurante.module';
import {DetallePedidoModule} from './detalle-pedido/detalle-pedido.module';
import {OpcionMenuModule} from './opcion-menu/opcion-menu.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        LoginModule,
        UsuarioModule,
        PedidoModule,
        RestauranteModule,
        DetallePedidoModule,
        OpcionMenuModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
