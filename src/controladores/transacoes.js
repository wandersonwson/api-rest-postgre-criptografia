import pool from '../dados/conexao.js';
async function listarTransacao(request, response) {
    const usuario_id = request.usuario.id;
    try {
        const { rows } = await pool.query('select * from transacoes where usuario_id = $1', [usuario_id]);
        for (const row of rows) {
            const { rows } = await pool.query('select * from categorias where id = $1', [row.categoria_id]);
            const categoria_nome = rows[0].descricao;
            row.categoria_nome = categoria_nome;
        }
        return response.status(200).json(rows);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function cadastrarTransacao(request, response) {
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    const usuario_id = request.usuario.id;
    try {
        const { rows } = await pool.query(
            'insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6) returning id, descricao, valor, data, categoria_id, usuario_id, tipo',
            [descricao, valor, data, categoria_id, usuario_id, tipo]
        );
        for (const row of rows) {
            const { rows } = await pool.query('select * from categorias where id = $1', [row.categoria_id]);
            const categoria_nome = rows[0].descricao;
            row.categoria_nome = categoria_nome;
        }
        return response.status(201).json(rows);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function removerTransacao(request, response) {
    const { id } = request.params;
    const usuario_id = request.usuario.id;
    try {
        const { rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, usuario_id]);
        if (rowCount < 1) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        await pool.query('delete from transacoes where id = $1', [id]);
        return response.status(204).send();
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function detalharTransacao(request, response) {
    const { id } = request.params;
    const usuario_id = request.usuario.id;
    try {
        const { rows, rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, usuario_id]);
        if (rowCount < 1) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        return response.json(rows[0]);
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function atualizarTransacao(request, response) {
    const { id } = request.params;
    const { descricao, valor, data, categoria_id, tipo } = request.body;
    const usuario_id = request.usuario.id;
    try {
        const { rowCount } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [id, usuario_id]);
        if (rowCount < 1) {
            return response.status(404).json({ mensagem: 'Transação não encontrada' });
        }
        await pool.query(
            'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6',
            [descricao, valor, data, categoria_id, tipo, id]
        );
        return response.status(204).send();
    } catch (error) {
        return response.status(500).json('Erro interno no servidor');
    }
}
async function listarCategorias(request, response) {
    try {
        const { rows } = await pool.query('select * from categorias');
        response.status(200).json(rows);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
async function obterExtrato(request, response) {
    try {
        const { rows: somaEntradas } = await pool.query(
            'select sum(valor) from transacoes where usuario_id = $1 and tipo = $2',
            [request.usuario.id, 'entrada']
        );
        const { rows: somaSaidas } = await pool.query(
            'select sum(valor) from transacoes where usuario_id = $1 and tipo = $2',
            [request.usuario.id, 'saida']
        );
        const extrato = {
            'entrada': Number(somaEntradas[0].sum),
            'saída': Number(somaSaidas[0].sum)
        };
        response.status(200).json(extrato);
    } catch (error) {
        return response.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}
export {
    cadastrarTransacao,
    listarCategorias,
    listarTransacao,
    removerTransacao,
    detalharTransacao,
    atualizarTransacao,
    obterExtrato
};