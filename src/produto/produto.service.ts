import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criaProduto(produtoEntity: CriaProdutoDTO) {
        await this.produtoRepository.save(produtoEntity)
    }

    async listaProduto() {
        const listarProduto = await this.produtoRepository.find()
        const mapearProduto = listarProduto.map(
            (produto) => new ListaProdutoDTO(produto.nome,produto.id,produto.valor)
        )
    return mapearProduto
}

    async atualizaProduto(id: string, produto: AtualizaProdutoDTO) {
        await this.produtoRepository.update(id,produto)
    }

    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id)
    }
}