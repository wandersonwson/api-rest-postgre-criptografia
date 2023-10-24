import express from 'express';
import validarToken from '../intermediarios/autenticacao.js';
import validarDadosTransacao from '../intermediarios/transacoes.js';
import { atualizarTransacao, cadastrarTransacao, detalharTransacao, listarTransacao, obterExtrato, removerTransacao } from '../controladores/transacoes.js';

const rotasTransacao = express.Router();

rotasTransacao.use(validarToken);
rotasTransacao.route('/transacao')
    .post(validarDadosTransacao, cadastrarTransacao)
    .get(listarTransacao);
rotasTransacao.get('/transacao/extrato', obterExtrato);
rotasTransacao.route('/transacao/:id')
    .delete(removerTransacao)
    .get(detalharTransacao)
    .put(validarDadosTransacao, atualizarTransacao);

export default rotasTransacao;