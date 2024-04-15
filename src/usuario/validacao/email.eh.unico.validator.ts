import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})

export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(private UsuarioRepository: UsuarioRepository) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioComEmail = await this.UsuarioRepository.buscaEmail(value)
        return !usuarioComEmail
    }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator

        })
    }
}