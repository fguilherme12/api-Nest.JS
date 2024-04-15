import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email.eh.unico.validator";

export class CriaUsuarioDTO {
    
    @IsNotEmpty({message: "O nome não pode ser vazio"})
    nome: string;

    @IsEmail(undefined , {message: "O email informado é inválido"})
    @EmailEhUnico({message: "O email já está cadastrado."})
    email: string;

    @MinLength(6, {message: "O número minimo de caracteres é 6"})
    senha: string;
}