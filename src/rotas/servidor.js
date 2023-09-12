import express from 'express';
import { atualizarUsuario, cadastrarUsuario, detalharUsuario, login } from '../controladores/usuarios.js';
import { validarAtualizacaoUsuario, validarDadosLogin, validarDadosUsuario } from '../intermediarios/usuarios.js';
import { atualizarTransacao, cadastrarTransacao, detalharTransacao, listarCategorias, listarTransacao, obterExtrato, removerTransacao } from '../controladores/transacoes.js';
import validarDadosTransacao from '../intermediarios/transacoes.js';
import validarToken from '../intermediarios/autenticacao.js';

const rotas = express();
rotas.post('/login', validarDadosLogin, login);
rotas.post('/usuario', validarDadosUsuario, cadastrarUsuario);

rotas.use(validarToken);
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarAtualizacaoUsuario, atualizarUsuario);
rotas.get('/categoria', listarCategorias);
rotas.post('/transacao', validarDadosTransacao,cadastrarTransacao);
rotas.get('/transacao', listarTransacao);
rotas.get('/transacao/extrato', obterExtrato);
rotas.delete('/transacao/:id', removerTransacao);
rotas.get('/transacao/:id', detalharTransacao);
rotas.put('/transacao/:id', validarDadosTransacao, atualizarTransacao);

export default rotas;