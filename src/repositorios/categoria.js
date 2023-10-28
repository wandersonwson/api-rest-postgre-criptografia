import { default as knex } from '../dados/conexao.js';

const categoriaRepositorio = {
    cadastrar: async function(dados) {
        const categoria = await knex('categorias').insert(dados, ['*']);
        return categoria[0];
    },
    buscarTudo: async function() {
        const categorias = await knex('categorias');
        return categorias;
    },
    buscarPorId: async function(id) {
        const categoria = await knex('categorias').where({ id }).first();
        return categoria;
    },
    buscarPorCampo: async function(campo, valor) {
        const categoria = await knex('categorias').where(campo, valor).first();
        return categoria;
    },
    buscarDescricao: async function(id) {
        const categoria = await knex('categorias').where({ id }).first();
        return categoria.descricao;
    },
    atualizar: async function(dados, id) {
        const categoria = await knex('categorias').where({ id }).update(dados, ['*']);
        return categoria[0];
    },
    excluir: async function(id) {
        const linhasAfetadas = await knex('categorias').where({ id }).del();
        return linhasAfetadas;
    }
}

export default categoriaRepositorio;