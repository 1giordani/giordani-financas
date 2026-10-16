# Giordani Finanças

Chat financeiro em português criado para o desafio DIO **MCP sem complicação: Open Finance com Pluggy e Sandbox**.

**Autor:** Giordani Martins Silva · GitHub: [1giordani](https://github.com/1giordani).

## Acessar

[Abrir aplicativo público](https://giordani-financas-demo.woollytune128.chatgpt.site) · [Repositório público](https://github.com/1giordani/giordani-financas).

Esta é a **Etapa 1**, com quatro contas e doze transações autorais fictícias. Não houve extração de dados da Plaid, execução de MCP financeiro, uso do Lovable ou conexão bancária. A interface foi implementada com assistência do Codex e hospedada via Sites. As respostas usam regras determinísticas, sem LLM. A especificação reproduzível para Lovable está em [docs/openspec.md](docs/openspec.md), mas não foi executada nessa plataforma.

## Entrega na DIO

Link para submissão: **https://github.com/1giordani/giordani-financas**.

Descrição sugerida: Assistente financeiro educacional em português com dados fictícios em USD. Permite consultar contas, saldos, transações e gastos por categoria, com filtros por conta e período. Inclui histórico local, testes de cálculo, especificação OpenSpec e guia de configuração MCP Pluggy/Plaid. Entrega da Etapa 1, sem integração bancária ativa.

## Perguntas e origem de cada resposta

| Pergunta | Fonte local | Tratamento |
|---|---|---|
| Mostrar minhas contas | `dist/data.js`: accounts | Nome, tipo e moeda |
| Qual é meu saldo? | accounts.current / available / limit | Depósitos separados de dívida e crédito |
| Últimas transações | transactions | Ordenação por data, cinco registros |
| Quanto gastei com alimentação? | transactions.category | Somente consumo confirmado |
| Resumo por categoria | transactions | Agrupamento e soma em centavos |
| Três padrões de gasto | Mesma amostra filtrada | Três observações descritivas, sem afirmar recorrência |

Os controles acima do chat filtram as próximas respostas por conta e período. Datas mencionadas livremente na mensagem **não são interpretadas**; use os controles. Os cartões do painel sempre mostram a amostra completa. Os saldos permanecem no snapshot de 16/10/2026, independentemente do filtro temporal.

Caminho real nesta versão: pergunta → `dist/app.js` → `answer()` em `dist/engine.js` → amostra `dist/data.js` → filtros e cálculo → texto e tabela com origem e período. Nenhum endpoint bancário é chamado.

## Regras financeiras

- Todos os valores são USD, formatados como US$; não há conversão cambial.
- Inteiros em centavos evitam erros de arredondamento nas somas.
- Convenção das transações: positivo = saída, negativo = entrada.
- Pendências ficam fora dos totais confirmados. Transferências ficam fora do consumo.
- Crédito disponível não é dinheiro depositado; saldo do cartão representa dívida.
- Campos ausentes aparecem como “Não informado”.
- O extrato é parcial e não deve ser somado para reconstruir os snapshots de saldo.
- Perguntas não suportadas recebem uma limitação e exemplos válidos.

## Melhoria escolhida

**Filtros por conta e intervalo de datas**, aplicados aos cálculos e tabelas do chat, com tratamento de conjunto vazio e datas invertidas. Acrescentados histórico local, nova conversa, exclusão do histórico e transparência da origem de cada resposta. O histórico mantém até 20 conversas e 80 mensagens por conversa neste navegador. Não armazene informações reais no chat demonstrativo.

## Executar e testar

Sem dependências de aplicação, APIs pagas ou chave de IA. Com Python 3 e Node.js 18 ou superior:

```sh
python -m http.server 8000 --directory dist
```

Abra http://localhost:8000. Não abra index.html por file:// porque o navegador precisa servir os módulos JavaScript por HTTP.

```sh
npm test
```

Os testes conferem sinais, pendências, exclusão de transferências do consumo, filtros, saldos, moeda, conjunto vazio, perguntas desconhecidas e bloqueio de escrita. Os arquivos JavaScript também passaram por `node --check`. Nesta entrega não foi possível realizar QA visual em navegador; a ausência de capturas não deve ser tratada como evidência de interface validada.

## MCP Pluggy e Plaid

Instruções para Windows e configuração sem segredos no repositório: [docs/mcp.md](docs/mcp.md). A configuração é manual no computador do aluno e não está ativa neste site.

A documentação oficial da Pluggy define Item como uma conexão com um conector de uma instituição, usada como entrada para produtos autorizados pelo usuário. No laboratório, o MCP Pluggy fornece documentação; a Plaid Sandbox fornece dados fictícios somente depois de configurada e consultada.

## Especificação, ajustes e integração futura

- [docs/openspec.md](docs/openspec.md): prompt original adaptado, requisitos e critérios de aceite.
- [docs/mcp.md](docs/mcp.md): preparação e validação dos servidores.
- [docs/evidencias.md](docs/evidencias.md): resultados reproduzíveis e limitações.

Ajustes feitos: nome Giordani Finanças; tema escuro com tons quentes; amostra própria sem alegar as 14 contas/48 transações do instrutor; valores em centavos; respostas locais por regras; filtros explícitos; origem dos dados em todas as respostas de consulta.

Etapa 2 pendente: backend autenticado, segredos apenas no servidor, Item Sandbox e token, paginação de POST /transactions/get e consulta POST /accounts/get. O MCP de desenvolvimento não substitui esse backend. Não há pagamentos, transferências nem webhook implementados. A Plaid Sandbox não representa o Open Finance brasileiro em produção.

## Estrutura

```text
dist/
  index.html
  style.css
  app.js
  data.js
  engine.js
docs/
  openspec.md
  mcp.md
  evidencias.md
tests/
  engine.test.js
package.json
README.md
```

## Referências

- [Guia do desafio](https://hermes.dio.me/files/assets/0e56ff91-f2bd-4f37-bd37-a330f5a844f2.pdf), páginas 25–28: Etapa 1 com amostra local.
- [Slides da aula](https://hermes.dio.me/files/assets/e0d3f15d-6418-4ca0-98a7-4130b7832c43.pdf).
- [Pluggy MCP](https://docs.pluggy.ai/pt/docs/developer-tools/mcp).
- [Pluggy Item](https://docs.pluggy.ai/en/docs/connections/item).
- [Servidor Sandbox oficial Plaid](https://github.com/plaid/ai-coding-toolkit/tree/main/sandbox).
- [Plaid Transactions](https://plaid.com/docs/api/products/transactions/).

Não publique credenciais, tokens, arquivos privados de configuração ou capturas que exponham esses valores. Esta entrega comprova o frontend e seus cálculos locais; as práticas MCP continuam pendentes.
