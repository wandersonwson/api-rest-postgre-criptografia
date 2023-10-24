import { conexao as knex } from '../dados/conexao.js';

const usuarioRepositorio = {
    cadastrar: async function(dados) {
        const usuario = await knex('usuarios').insert(dados, ['*']);
        return usuario[0];
    },
    buscarTudo: async function() {
        const usuarios = await knex('usuarios');
        return usuarios;
    },
    buscarPorId: async function(id) {
        const usuario = await knex('usuarios').where({ id }).first();
        return usuario;
    },
    buscarPorCampo: async function(campo, valor) {
        const usuario = await knex('usuarios').where(campo, valor).first();
        return usuario;
    },
    atualizar: async function(dados, id) {
        const usuario = await knex('usuarios').where({ id }).update(dados, ['*']);
        return usuario[0];
    },
    excluir: async function(id) {
        const linhasAfetadas = await knex('usuarios').where({ id }).del();
        return linhasAfetadas;
    }
}

export default usuarioRepositorio;