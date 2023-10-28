import { usuarioRepositorio } from '../repositorios/index.js';
import jwt from 'jsonwebtoken';
const chave = process.env.JWT_KEY;

const validarToken = async (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }
    const token = authorization.split(" ")[1];
    try {
        const { id } = jwt.verify(token, chave);
        const usuario = usuarioRepositorio.buscarPorId(id);
        if (!usuario) {
            return response.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        }
        delete usuario.senha;
        request.usuario = usuario;
    } catch (error) {
        return response.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }
    next();
}

export default validarToken;