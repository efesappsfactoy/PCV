import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PedidoEntity} from '../pedido/pedido.entity';
import {OpcionMenuEntity} from '../opcion-menu/opcion-menu.entity';

@Entity('detalle_pedido')
export class DetallePedidoEntity {

    @PrimaryGeneratedColumn({
        name: 'id_detalle_pedido'
    })
    id: number;

    @Column({
        name:'cantidad_detalle_pedido',
        type:'tinyint'
    })
    cantidad: number;

    @Column({
        name: 'precio_detalle_pedido',
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    precio: number;

    @ManyToOne(
        type => PedidoEntity,
        pedido => pedido.detalles
    )
    pedido: PedidoEntity;

    @ManyToOne(
        type => OpcionMenuEntity,
        opcionMenu => opcionMenu.detalles
    )
    opcionMenu: OpcionMenuEntity;
}