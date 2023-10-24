import express from 'express';
import 'dotenv/config.js';
import rotas from './rotas';

const app = express();
app.use(express.json());
app.use(rotas);
const porta = process.env.PORT || 3000;
app.listen(porta);