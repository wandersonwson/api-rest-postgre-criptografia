### API Rest com PostgreSQL e Criptografia #PotenciaTech

Neste projeto foi realizada a criação de uma API Rest que simula a criação de um sistema de trnsações bancárias, incluindo o login de usuários, a criptografia de senhas e a validação de tokens de acesso. O desafio foi proposto ao final do módulo 3 do curso de desenvolvimento de software backend da Cubos Academy.
O desafio foi realizado em dupla, por mim e meu colega de curso [Arthur Vasconcelos](https://github.com/arthur-vv).

#### Objetivo

A API Restful foi elaborada para permitir as seguintes transações:
-   Cadastrar usuário (POST /usuario);
-   Fazer login (POST /login);
-   Detalhar perfil do usuário logado (GET /usuario);
-   Editar perfil do usuário logado (PUT /usuario);
-   Listar categorias (GET /categoria);
-   Listar transações (GET /transacao);
-   Detalhar transação (GET /transacao/:id);
-   Cadastrar transação (POST /transacao);
-   Editar transação (PUT /transacao/:id);
-   Remover transação (DELETE /transacao/:id);
-   Extrato de transações (GET /transacao/extrato).

#### Persitência de dados

Para o armazenamento de dados foi criado um banco de dados PostgreSQL chamado `dindin` contendo as seguintes tabelas e colunas:

-   usuarios
    -   id
    -   nome
    -   email (campo único)
    -   senha
-   categorias
    -   id
    -   descricao
-   transacoes
    -   id
    -   descricao
    -   valor
    -   data
    -   categoria_id
    -   usuario_id
    -   tipo

As categorias foram previamente cadastradas. O arquivo database.sql contém o script utilizado para a criação das tabelas e a inserção das categorias.