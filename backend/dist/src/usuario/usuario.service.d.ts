import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
export declare class UsuarioService {
    private readonly _usuarioRepository;
    constructor(_usuarioRepository: Repository<UsuarioEntity>);
    autenticar(username: string, password: string): Promise<boolean>;
}
