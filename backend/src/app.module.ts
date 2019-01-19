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
        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: '172.29.64.209',
                port: 32773,
                database: 'web',
                username: 'adrian',
                password: '12345678',
                synchronize: true //para nueva bd
            }),
        LoginModule,
        UsuarioModule,
        PedidosModule,
        RestauranteModule],
    controllers: [AppController, RestauranteController],
    providers: [AppService],
})
export class AppModule {
}
