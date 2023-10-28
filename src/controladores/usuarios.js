import { usuarioRepositorio } from '../repositorios/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const chave = process.env.JWT_KEY;

async function login(request, response) {
    const { email, senha } = request.body;
    try {
        const usuario = usuarioRepositorio.buscarPorCampo('email', email);
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) {
            return response.status(400).json({ mensgaem: 'Usuário e/ou senha inválido(s).' });
        }
        const token = jwt.sign({id: usuario.id}, chave, {expiresIn: '8h'});
        const { senha: cifra, ...usuarioLogado } = usuario;
        return response.status(200).json({ usuario: usuarioLogado, token });         
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function cadastrarUsuario(request, response) {
    const { nome, email, senha } = request.body;
    try {
        const senhaCifrada = await bcrypt.hash(senha, 10);
        const usuario = usuarioRepositorio.cadastrar({ nome, email, senha: senhaCifrada });
        return response.status(201).json(usuario);
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
        const usuario = usuarioRepositorio.atualizar({nome, email, senha: senhaCifrada }, request.usuario.id);
        return response.status(201).json(usuario);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

export { login, cadastrarUsuario, detalharUsuario, atualizarUsuario };