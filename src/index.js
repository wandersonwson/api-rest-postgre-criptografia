import express from 'express';
import 'dotenv/config.js';
import rotas from './rotas/servidor.js';
const app = express();
app.use(express.json());
app.use(rotas);
app.listen(3000);