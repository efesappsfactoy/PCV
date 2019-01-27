import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RestauranteController} from './restaurante/restaurante.controller';
import { LoginModule } from './login/login.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { RestauranteModule } from './restaurante/restaurante.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        LoginModule,
        UsuarioModule,
        PedidosModule,
        RestauranteModule],
    controllers: [AppController, RestauranteController],
    providers: [AppService],
})
export class AppModule {
}
