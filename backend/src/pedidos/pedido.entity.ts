import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {DetallePedidoEntity} from '../detalle-pedido/detalle-pedido.entity';


@Entity('pedido')
export class PedidoEntity {

    @PrimaryGeneratedColumn({
        name:'id_pedido'
    })
    id: number;

    @Column({
        name: 'precio_pedido',
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    precio: number;

    @Column({
        name: 'turno_pedido',
        type: 'smallint'
    })
    turno: number;

    @Column({
        name: 'estado_pedido',
        length: 15
    })
    estado: string;

    @OneToMany(
        type => DetallePedidoEntity,
        detallePedido => detallePedido.pedido
    )
    detalles: DetallePedidoEntity[];

}