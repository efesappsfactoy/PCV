"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const restaurante_controller_1 = require("./restaurante/restaurante.controller");
const login_module_1 = require("./login/login.module");
const usuario_module_1 = require("./usuario/usuario.module");
const pedidos_module_1 = require("./pedidos/pedidos.module");
const restaurante_module_1 = require("./restaurante/restaurante.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '172.29.64.209',
                port: 32773,
                database: 'web',
                username: 'adrian',
                password: '12345678',
                synchronize: true
            }),
            login_module_1.LoginModule,
            usuario_module_1.UsuarioModule,
            pedidos_module_1.PedidosModule,
            restaurante_module_1.RestauranteModule
        ],
        controllers: [app_controller_1.AppController, restaurante_controller_1.RestauranteController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map