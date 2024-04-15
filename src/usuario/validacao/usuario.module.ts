import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./email.eh.unico.validator";

@Module({
        controllers: [UsuarioController], // Todos os controllers do projeto devem ser adicionados aqui
        providers:[UsuarioRepository, EmailEhUnicoValidator] // Todas as classes que devem ser instanciadas devem ser adicionadas aqui, e decoradas com Injectable
    })

export class UsuarioModule {}
