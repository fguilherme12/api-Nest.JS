import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";

@Controller('/produtos')

export class ProdutosController {

    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criaProduto(@Body() criaProduto) {
        this.produtoRepository.salvar(criaProduto)
        return criaProduto
    }

    @Get()
    async lsitarProdutos() {
        return this.produtoRepository.listar()
    }
}