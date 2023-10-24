import express from 'express';
import { validarDadosLogin, validarDadosUsuario } from '../intermediarios/usuarios.js';
import { cadastrarUsuario, login } from '../controladores/usuarios.js';

const rotasLogin = express.Router();

rotasLogin.post('/login', validarDadosLogin, login);
rotasLogin.post('/usuario', validarDadosUsuario, cadastrarUsuario);

export default rotasLogin;