import { default as knex } from '../dados/conexao.js';

const transacaoRepositorio = {
    cadastrar: async function(dados) {
        const transacao = await knex('transacoes').insert(dados, ['*']);
        return transacao[0];
    },
    buscarTudo: async function() {
        const transacoes = await knex('transacoes');
        return transacoes;
    },
    buscarPorId: async function(id) {
        const transacao = await knex('transacoes').where({ id }).first();
        return transacao;
    },
    buscarPorCampo: async function(campo, valor) {
        const transacoes = await knex('transacoes').where(campo, valor);
        return transacoes;
    },
    selecionar: async function(id, usuario_id) {
        const transacao = await knex('transacoes').where({ id, usuario_id }).first();
        return transacao;
    },
    somarPorTipo: async function(usuario_id, tipo) {
        const soma = await knex('transacoes').sum('valor').where({ usuario_id, tipo });
        return soma;
    },
    atualizar: async function(dados, id) {
        const transacao = await knex('transacoes').where({ id }).update(dados, ['*']);
        return transacao[0];
    },
    excluir: async function(id) {
        const linhasAfetadas = await knex('transacoes').where({ id }).del();
        return linhasAfetadas;
    }
}

export default transacaoRepositorio;