# Evidências e limites

## Verificação automatizada

Execução em Node.js: `npm test` — 7 testes, 7 aprovados. Sintaxe de `app.js`, `engine.js` e `data.js` validada por `node --check`.

| Consulta/cálculo | Resultado esperado e verificado |
|---|---|
| Registros da amostra | 12 |
| Dinheiro disponível | US$ 300,00 |
| Dívida de cartões | US$ 5.430,00 |
| Consumo confirmado, amostra completa | US$ 354,40 |
| Saídas confirmadas, incluindo transferências | US$ 554,40 |
| Entradas confirmadas, incluindo transferências | US$ 2.700,00 |
| Pendência, separada | US$ 12,50 |
| Alimentação confirmada, amostra completa | US$ 232,50 |
| Alimentação confirmada, somente outubro | US$ 194,50 |
| Cartão pessoal, 01–10/10 | 2 transações, US$ 97,50 de consumo |

## Capturas a coletar

Não foram geradas capturas de tela nem alegada validação visual do navegador. Para complementar o portfólio, abra o app e capture:

1. Consulta de saldos, mostrando separação de depósito/dívida/crédito.
2. Alimentação com filtro 01/10/2026–16/10/2026.
3. Resumo e tabela de categorias.
4. Futuramente, tabelas de uma consulta MCP real do Sandbox, omitindo integralmente credenciais e tokens.

Esses itens são um roteiro; não são evidências já coletadas.

## Estado das integrações

- Implementado e testado: motor local de filtros e cálculos.
- Implementado, sem QA visual: interface responsiva, conversa e persistência no navegador.
- Não executado: MCP Pluggy, MCP Plaid, Item Sandbox e leitura API.
- Não executado: Lovable e exportação Lovable → GitHub.
- Publicado: app com acesso público e repositório público `1giordani/giordani-financas`.
