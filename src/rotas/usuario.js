import express from 'express';
import { atualizarUsuario, detalharUsuario } from '../controladores/usuarios.js';
import validarToken from '../intermediarios/autenticacao.js';
import { validarAtualizacaoUsuario } from '../intermediarios/usuarios.js';

const rotasUsuario = express.Router();

rotasUsuario.use(validarToken);
rotasUsuario.route('/usuario')
    .get(detalharUsuario)
    .put(validarAtualizacaoUsuario, atualizarUsuario);

export default rotasUsuario;