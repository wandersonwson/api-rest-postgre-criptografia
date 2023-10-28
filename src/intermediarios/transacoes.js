import { categoriaRepositorio } from '../repositorios/index.js';

async function validarDadosTransacao(request, response, next) {
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return response.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }
    const categoria = categoriaRepositorio.buscarPorId(categoria_id);
    if (!categoria) {
        return response.status(400).json({ mensagem: 'Categoria inválida.' });
    }
    if (tipo != 'entrada' && tipo != 'saida') {
        return response.status(400).json({ mensagem: 'Tipo de transação inválido.' });
    }
    next();
}

export default validarDadosTransacao;