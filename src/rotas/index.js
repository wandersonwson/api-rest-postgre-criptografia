import express from 'express';
import rotasLogin from './login.js';
import rotasUsuario from './usuario.js';
import rotasCategoria from './categoria.js';
import rotasTransacao from './transacao.js';

const rotas = express();

rotas.use(rotasLogin);
rotas.use(rotasUsuario);
rotas.use(rotasCategoria);
rotas.use(rotasTransacao);

export default rotas;