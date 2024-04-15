import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async buscaEmail(email: string) {

    const possivelUsuario = this.usuarios.find(
      usuario => usuario.email === email
      
    )

    return possivelUsuario !== undefined
  }

  async buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      usuarioSalvo => usuarioSalvo.id === id
    )

    if(!possivelUsuario) {
      throw Error('Usuário não existe')
    }

    return possivelUsuario
  }
  
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
        if (chave === 'id') {
            return;
        }

        usuario[chave] = valor;
    });

    return usuario;
}

  async deleta(id: string) {
    const usuarioDeletado = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
    )

    return usuarioDeletado
  }
}
