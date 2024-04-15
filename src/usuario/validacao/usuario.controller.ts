import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from '../dto/cria.usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import {v4 as uuid} from 'uuid';
import { ListaUsuario } from '../dto/lista.usuario.dto';
import { AtualizaUsuarioDTO } from '../dto/atualiza.usuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  
  constructor(private usuarioRepository: UsuarioRepository) {}
  
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuario(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuario criado com sucesso!'
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuarioLista = usuariosSalvos.map(
      usuario => new ListaUsuario(
        usuario.id,
        usuario.nome
      )
    )

    return usuarioLista
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados)

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuario atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioRepository.deleta(id)

    return {
      usuario: usuarioDeletado,
      mensagem: 'Usuario deletado com sucesso'
  }

}

}