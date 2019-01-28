import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {DetallePedidoEntity} from '../detalle-pedido/detalle-pedido.entity';
import {RestauranteEntity} from '../restaurante/restaurante.entity';

@Entity('opcion_menu')
export class OpcionMenuEntity {

    @PrimaryGeneratedColumn({
        name: 'id_opcion_menu'
    })
    id: number;

    @Column({
        name: 'nombre_opcion_menu',
        length: 15
    })
    nombre: string;

    @Column({
        name: 'nombre_archivo_opcion_menu'
    })
    nombreArchivo: string;

    @Column({
        name: 'precio_opcion_menu',
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    precio: number;

    @OneToMany(
        type => DetallePedidoEntity,
        detallePedido => detallePedido.opcionMenu
    )
    detalles: DetallePedidoEntity[];

    @ManyToOne(
        type => RestauranteEntity,
        restaurante => restaurante.opciones
    )
    restaurante: RestauranteEntity;
}