import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email.eh.unico.validator";

export class AtualizaUsuarioDTO {
    
    @IsNotEmpty({message: "O nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsEmail(undefined , {message: "O email informado é inválido"})
    @EmailEhUnico({message: "O email já está cadastrado."})
    @IsOptional()
    email: string;

    @MinLength(6, {message: "O número minimo de caracteres é 6"})
    @IsOptional()
    senha: string;
}