import express from 'express';
import rotasLogin from './login.rotas.js';
import rotasUsuario from './usuario.rotas.js';
import rotasCategoria from './categoria.rotas.js';
import rotasTransacao from './transacao.rotas.js';

const rotas = express();

rotas.use(rotasLogin);
rotas.use(rotasUsuario);
rotas.use(rotasCategoria);
rotas.use(rotasTransacao);

export default rotas;