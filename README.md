# Requisitos do App

## Criação

[x] - Usuário deve ser capaz de cadastrar uma nova despesa dando a ela um nome (categoria), dizendo a quantia que foi gasta, data em que foi feita, dizer se é essencial ou não, e se é recorrente ou não. Pode também, opcionalmente, dar-lhe uma observação.

[x] - Deve ser possível criar novas categorias

## Listagens e Filtros

[x] - O usuário deve receber uma listagem de todos as ultimas 15 despesas (com paginação), mostrando todos os dados informados na criação (Para facilitar a vida do front, adicionei a contagem total, e uma flag que diz se tem mais expenses) -- formatar data de criação no padrão BR (dd/mm/aaaa);

[x] - Deve fazer uma contagem dos gastos referentes ao mês atual e, além do valor total, separar a soma dos gastos essenciais e não essenciais;

[x] - Deve fazer a mesma contagem, com as mesmas separações, mas referentes ao mês anterior;

[x] - Deve ser possível fazer a mesma contagem, do mês anterior, porém apenas até o dia atual. Se hoje é dia 14/01, deve ser possível obter as somatórias até o dia 14/12 (do ano anterior, obviamente);

[x] - O usuário deve poder obter a mesma somatória de qualquer mês que já tenha passado

[x] - Deve poder obter a listagem de qualquer mês que já tenha passado, também com paginação;

[x] - Deve poder obter a listagem de qualquer intervalo de tempo;

[x] - Deve poder obter a somatória de qualquer intervalo de tempo;

[x] - Deve ser possível selecionar apenas os gastos essenciais do período que está sendo listado;

[x] - Deve ser possível selecionar apenas os gastos não essenciais do período que está sendo listado;

[x] - Deve ser possível selecionar apenas os gastos recorrentes do período que está sendo listado;

[x] - Deve ser possível selecionar apenas os gastos não recorrentes do período que está sendo listado;

[x] - Deve ser possível listar as categorias em ordem alfabética;

[ ] - Deve ser possível pesquisar por uma categoria;

## Atualização

[ ] - Deve ser possível atualizar os dados de uma despesa, alterando absolutamente tudo;

## Deletar

[ ] - Deve ser possível deletar uma despesa;

[ ] - Deve ser possível deletar uma categoria;