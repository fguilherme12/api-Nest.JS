import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './usuario/produto.module';

@Module({
  imports: [UsuarioModule, ProdutoModule],

})
export class AppModule {}
