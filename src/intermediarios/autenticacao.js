import jwt from 'jsonwebtoken';
import chave from '../autenticacao/chaveJWT.js';
import pool from "../dados/conexao.js";
const validarToken = async (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }
    const token = authorization.split(" ")[1];
    try {
        const { id } = jwt.verify(token, chave);
        const { rows, rowCount } = await pool.query('select id, nome, email from usuarios where id = $1', [id]);
        if (rowCount < 1) {
            return response.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
        }
        request.usuario = rows[0];
    } catch (error) {
        return response.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }
    next();
}
export default validarToken;