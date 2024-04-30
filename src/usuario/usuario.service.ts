import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuario } from "./dto/lista.usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async ListaUsuario() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuarioLista = usuariosSalvos.map(
            (usuario) => new ListaUsuario(usuario.id, usuario.nome)
        )

        return usuarioLista
    }
} 