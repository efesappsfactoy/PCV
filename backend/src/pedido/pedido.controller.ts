import { Controller } from '@nestjs/common';
import {PedidoService} from './pedido.service';

@Controller('pedido')
export class PedidoController {
    constructor(private readonly _pedidoService: PedidoService) {

    }
}
