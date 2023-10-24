import express from 'express';
import validarToken from '../intermediarios/autenticacao.js';
import { listarCategorias } from '../controladores/transacoes.js';

const rotasCategoria = express.Router();

rotasCategoria.use(validarToken);
rotasCategoria.get('/categoria', listarCategorias);

export default rotasCategoria;