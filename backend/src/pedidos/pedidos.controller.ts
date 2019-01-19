import { Controller } from '@nestjs/common';
import {PedidosService} from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
    constructor(private readonly _pedidoService: PedidosService) {

    }
}
