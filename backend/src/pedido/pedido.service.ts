import {Injectable} from '@nestjs/common';
import {PedidoEntity} from './pedido.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {FindManyOptions, Repository} from 'typeorm';
import {Pedido} from './pedido.interface';

@Injectable()
export class PedidoService {

    constructor(
        @InjectRepository(PedidoEntity)
        private readonly _pedidoRepository: Repository<PedidoEntity>
    ) {
    }

    //CREATE:
    crear(pedido: Pedido): Promise<PedidoEntity> {

        // Metodo Create es como un CONSTRUCTOR de la ENTIDAD
        const pedidoEntity: PedidoEntity = this._pedidoRepository
            .create(pedido);

        // Metodo Save Guarda en la BDD
        return this._pedidoRepository.save(pedidoEntity);

    }

    //READ:
    buscar(parametrosBusqueda?: FindManyOptions<PedidoEntity>): Promise<PedidoEntity[]> {
        return this._pedidoRepository.find(parametrosBusqueda);
    }

    buscarPorId(idPedido: number): Promise<PedidoEntity> {
        return this._pedidoRepository.findOne(idPedido);
    }

    //UPDATE:
    actualizar(nuevoPedido: Pedido): Promise<PedidoEntity> {

        const pedidoEntity: PedidoEntity = this._pedidoRepository
            .create(nuevoPedido);

        return this._pedidoRepository.save(pedidoEntity);

    }

    //DELETE:
    eliminar(idPedido: number): Promise<PedidoEntity> {

        const pedidoPorEliminar: PedidoEntity = this._pedidoRepository
            .create({
                id: idPedido
            });

        return this._pedidoRepository.remove(pedidoPorEliminar);
    }

}
