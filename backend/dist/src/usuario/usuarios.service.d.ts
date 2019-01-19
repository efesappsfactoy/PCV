import { UsuarioEntity } from './usuarios.entity';
import { Repository } from 'typeorm';
export declare class UsuariosService {
    private readonly _usuarioRepository;
    constructor(_usuarioRepository: Repository<UsuarioEntity>);
    autenticar(username: string, password: string): Promise<boolean>;
}
