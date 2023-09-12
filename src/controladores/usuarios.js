import pool from '../dados/conexao.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import chave from '../autenticacao/chaveJWT.js';
async function login(request, response) {
    const { email, senha } = request.body;
    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email]);
        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);
        if(!senhaValida) {
            return response.status(400).json({ mensgaem: 'Usuário e/ou senha inválido(s).' });
        }
        const token = jwt.sign({id: usuario.rows[0].id}, chave, {expiresIn: '8h'});
        const { senha: cifra, ...usuarioLogado } = usuario.rows[0];
        response.status(200).json({ usuario: usuarioLogado, token });         
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function cadastrarUsuario(request, response) {
    const { nome, email, senha } = request.body;
    try {
        const senhaCifrada = await bcrypt.hash(senha, 10);
        const novoUsuario = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email',
            [nome, email, senhaCifrada]
        );
        return response.status(201).json(novoUsuario.rows[0]);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
function detalharUsuario(request, response) {
    return response.status(200).json(request.usuario);
}
async function atualizarUsuario(request, response) {
    const { nome, email, senha } = request.body;
    try {
        const senhaCifrada = await bcrypt.hash(senha, 10);
        await pool.query(
            'update usuarios set nome = $1, email = $2, senha = $3 where id = $4',
            [nome, email, senhaCifrada, request.usuario.id]
        );
        return response.status(201).json();
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
export { login, cadastrarUsuario, detalharUsuario, atualizarUsuario };