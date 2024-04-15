import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository {
        private produtos = [] ;

        async salvar(produto) {
            return this.produtos.push(produto);
        }

        async listar() {
            return this.produtos;
        }

}