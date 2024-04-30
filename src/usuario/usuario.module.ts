import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/email.eh.unico.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
        
        imports: [TypeOrmModule.forFeature([UsuarioEntity])],
        controllers: [UsuarioController], // Todos os controllers do projeto devem ser adicionados aqui
        providers:[UsuarioService, UsuarioRepository, EmailEhUnicoValidator] // Todas as classes que devem ser instanciadas devem ser adicionadas aqui, e decoradas com Injectable
    })

export class UsuarioModule {}
