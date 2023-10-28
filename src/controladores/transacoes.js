import { categoriaRepositorio, transacaoRepositorio } from '../repositorios/index.js';

async function listarTransacao(request, response) {
    const usuario_id = request.usuario.id;
    try {
        const transacoes = transacaoRepositorio.buscarPorCampo('usuario_id', usuario_id);
        for (const item of transacoes) {
            item.categoria_nome = categoriaRepositorio.buscarDescricao(item.categoria_id);
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
        const transacao = transacaoRepositorio.cadastrar({ descricao, valor, data, categoria_id, usuario_id, tipo });
        transacao.categoria_nome = categoriaRepositorio.buscarDescricao(transacao.categoria_id);
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
        const transacao = transacaoRepositorio.selecionar(id, usuario_id);
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
        const transacao = transacaoRepositorio.selecionar(id, usuario_id);
        if (!transacao) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        transacao.categoria_nome = categoriaRepositorio.buscarDescricao(transacao.categoria_id);
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
        const transacao = transacaoRepositorio.selecionar(id, usuario_id);
        if (!transacao) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        const transacaoAtualizada = transacaoRepositorio.atualizar({ descricao, valor, data, categoria_id, tipo }, id);
        return response.status(200).send(transacaoAtualizada);
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function listarCategorias(request, response) {
    try {
        const categorias = categoriaRepositorio.buscarTudo();
        response.status(200).json(categorias);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function obterExtrato(request, response) {
    try {
        // const { rows: entradas } = await pool.query(
        //     'select sum(valor) from transacoes where usuario_id = $1 and tipo = $2',
        //     [request.usuario.id, 'entrada']
        // );
        const somaEntradas = transacaoRepositorio.somarPorTipo(request.usuario.id, 'entrada');
        // const { rows: saidas } = await pool.query(
        //     'select sum(valor) from transacoes where usuario_id = $1 and tipo = $2',
        //     [request.usuario.id, 'saida']
        // );
        const somaSaidas = transacaoRepositorio.somarPorTipo(request.usuario.id, 'saida');
        const extrato = {
            'entrada': Number(somaEntradas),
            'saída': Number(somaSaidas)
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