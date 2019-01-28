import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OpcionMenuEntity} from '../opcion-menu/opcion-menu.entity';

@Entity('restaurante')
export class RestauranteEntity {

    @PrimaryGeneratedColumn({
        name: 'id_restaurante'
    })
    id: number;

    @Column({
        name: 'nombre_resturante',
        length: 15
    })
    nombre: string;

    @Column({
        name: 'numero_local_restaurante',
        type: 'tinyint'
    })
    numeroLocal: number;

    @Column({
        name: 'codigo_menu_restaurante',
        length: 15
    })
    codigoMenu: string;

    @OneToMany(
        type => OpcionMenuEntity,
        opcionMenu => opcionMenu.restaurante
    )
    opciones: OpcionMenuEntity[];
}