import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OpcionMenuEntity} from './opcion-menu.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                OpcionMenuEntity
            ])
    ]
})
export class OpcionMenuModule {
}
