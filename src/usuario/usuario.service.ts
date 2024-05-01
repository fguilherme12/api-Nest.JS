import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { ListaUsuario } from "./dto/lista.usuario.dto";
import { AtualizaUsuarioDTO } from "./dto/atualiza.usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async criaUsuario(usuarioEntity: UsuarioEntity) {
        await this.usuarioRepository.save(usuarioEntity)
    }
    
    async listaUsuario() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuarioLista = usuariosSalvos.map(
            (usuario) => new ListaUsuario(usuario.id, usuario.nome)
        )

        return usuarioLista
    }

    async atualizaUsuario(id: string, usuario: AtualizaUsuarioDTO) {
        await this.usuarioRepository.update(id,usuario)
    }

    async deletaUsuario(id: string) {
        await this.usuarioRepository.delete(id)
    }
} 