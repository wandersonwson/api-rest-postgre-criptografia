import pool from '../dados/conexao.js';
async function validarDadosTransacao(request, response, next) {
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }
    const { rowCount } = await pool.query('select * from categorias where id = $1', [categoria_id]);
    if (rowCount === 0) {
        return res.status(400).json({ mensagem: 'Categoria inválida.' });
    }
    if (tipo != 'entrada' && tipo != 'saida') {
        return res.status(400).json({ mensagem: 'Tipo de transação inválido.' });
    }
    next();
}
export default validarDadosTransacao;