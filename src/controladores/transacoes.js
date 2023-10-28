import { categoriaRepositorio, transacaoRepositorio } from '../repositorios/index.js';

async function listarTransacao(request, response) {
    const usuario_id = request.usuario.id;
    try {
        const transacoes = await transacaoRepositorio.buscarPorCampo('usuario_id', usuario_id);
        for (const item of transacoes) {
            item.categoria_nome = await categoriaRepositorio.buscarDescricao(item.categoria_id);
            delete item.categoria_id;
        }
        return response.status(200).json(transacoes);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function cadastrarTransacao(request, response) {
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    const usuario_id = request.usuario.id;
    try {
        const transacao = await transacaoRepositorio.cadastrar({ descricao, valor, data, categoria_id, usuario_id, tipo });
        transacao.categoria_nome = await categoriaRepositorio.buscarDescricao(transacao.categoria_id);
        delete transacao.categoria_id;
        return response.status(201).json(transacao);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function removerTransacao(request, response) {
    const { id } = request.params;
    const usuario_id = request.usuario.id;
    try {
        const transacao = await transacaoRepositorio.selecionar(id, usuario_id);
        if (!transacao) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        transacaoRepositorio.excluir(id);
        return response.status(204).send();
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function detalharTransacao(request, response) {
    const { id } = request.params;
    const usuario_id = request.usuario.id; 
    try {
        const transacao = await transacaoRepositorio.selecionar(id, usuario_id);
        if (!transacao) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        transacao.categoria_nome = await categoriaRepositorio.buscarDescricao(transacao.categoria_id);
        delete transacao.categoria_id;
        return response.json(transacao);
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function atualizarTransacao(request, response) {
    const { id } = request.params;
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    const usuario_id = request.usuario.id;
    try {
        const transacao = await transacaoRepositorio.selecionar(id, usuario_id);
        if (!transacao) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        const transacaoAtualizada = await transacaoRepositorio.atualizar({ descricao, valor, data, categoria_id, tipo }, id);
        return response.status(200).send(transacaoAtualizada);
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function listarCategorias(request, response) {
    try {
        const categorias = await categoriaRepositorio.buscarTudo();
        response.status(200).json(categorias);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function obterExtrato(request, response) {
    try {
        const somaEntradas = await transacaoRepositorio.somarPorTipo(request.usuario.id, 'entrada');
        console.log(somaEntradas);
        const somaSaidas = await transacaoRepositorio.somarPorTipo(request.usuario.id, 'saida');
        console.log(somaSaidas);
        const extrato = {
            'entrada': Number(somaEntradas[0].sum),
            'saída': Number(somaSaidas[0].sum)
        };
        response.status(200).json(extrato);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
export {
    cadastrarTransacao,
    listarCategorias,
    listarTransacao,
    removerTransacao,
    detalharTransacao,
    atualizarTransacao,
    obterExtrato
};