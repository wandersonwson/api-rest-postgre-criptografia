import { usuarioRepositorio } from '../repositorios/index.js';

async function validarDadosLogin(request, response, next) {
    const { email, senha } = request.body;
    try {
        if (!email || !senha) {
            return response.status(400).json({ mensagem: 'Os campos email e senha são obrigatórios.' });
        }
        const usuario = await usuarioRepositorio.buscarPorCampo('email', email);
        if (!usuario) {
            return response.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
    next();
}
async function validarDadosUsuario(request, response, next) {
    const { nome, email, senha } = request.body;
    try {
        if (!nome || !email || !senha) {
            return response.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }
        const usuario = await usuarioRepositorio.buscarPorCampo('email', email);
        if (usuario) {
            return response.status(400).json({ mensagem: 'Já existe um usuário cadastrado com o email informado.' });
        }
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
    next();
}
async function validarAtualizacaoUsuario(request, response, next) {
    const { nome, email, senha } = request.body;
    try {
        if (!nome || !email || !senha) {
            return response.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }
        const usuario = await usuarioRepositorio.verificarExistenciaEmail(request.usuario.id, email);
        if (usuario) {
            return response.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' });
        }
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
    next();
}

export { validarDadosLogin, validarDadosUsuario, validarAtualizacaoUsuario };