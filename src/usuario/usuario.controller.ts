import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/cria.usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import {v4 as uuid} from 'uuid';
import { ListaUsuario } from './dto/lista.usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza.usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  
  constructor(
    private usuarioRepository: UsuarioRepository,
    private readonly usuarioService: UsuarioService
  ) {}
  
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.id = uuid();

    this.usuarioService.criaUsuario(usuarioEntity);
    return {
      usuario: new ListaUsuario(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuario criado com sucesso!'
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuario();
    return usuariosSalvos
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados)

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuario atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioService.deletaUsuario(id)

    return {
      usuario: usuarioDeletado,
      mensagem: 'Usuario deletado com sucesso'
  }

}

}