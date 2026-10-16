# Configurar os MCPs — laboratório separado do site

## Pluggy: documentação

No cliente MCP compatível, adicione servidor **Streamable HTTP**, nome `pluggy`, URL `https://mcp.pluggy.ai/mcp`, sem chave. Reinicie o cliente se necessário e confira a lista de ferramentas. Quando disponível, `/mcp` mostra os servidores.

Peça: “Use a documentação da Pluggy para explicar o que é um Item. Cite a página consultada. Não crie conexões.” Uma resposta de documentação não comprova leitura de contas.

## Plaid Sandbox no Windows

1. Crie/acesse sua conta no [Dashboard Plaid](https://dashboard.plaid.com), em Developers → Keys. Use somente credenciais Sandbox.
2. Instale o uv pela [instrução oficial Astral](https://docs.astral.sh/uv/getting-started/installation/). No PowerShell, confira `uv --version` e `(Get-Command uvx).Source`.
3. Nas configurações MCP do cliente, adicione servidor **STDIO**, nome `plaid`, comando igual ao caminho completo do uvx encontrado, argumento `mcp-server-plaid`.
4. Em variáveis de ambiente privadas desse servidor, adicione `PLAID_CLIENT_ID` e `PLAID_SECRET` com os valores Sandbox. Não escreva valores neste projeto.
5. Salve, reinicie o cliente e confirme que as ferramentas foram carregadas. A primeira execução pode baixar dependências.

Exemplo genérico de configuração JSON **somente como modelo**, não autoexecutado:

```json
{
  "mcpServers": {
    "pluggy": { "type": "http", "url": "https://mcp.pluggy.ai/mcp" },
    "plaid": {
      "command": "CAMINHO_COMPLETO_DO_UVX",
      "args": ["mcp-server-plaid"],
      "env": {
        "PLAID_CLIENT_ID": "PREENCHER_APENAS_NA_CONFIGURACAO_PRIVADA",
        "PLAID_SECRET": "PREENCHER_APENAS_NA_CONFIGURACAO_PRIVADA"
      }
    }
  }
}
```

O formato do bloco HTTP depende do cliente; prefira seu formulário de configuração. O repositório oficial Plaid documenta tanto uso por variáveis quanto por argumentos. Prefira as variáveis privadas, sem valores em histórico de comandos.

## Validar em etapas

1. Consultar documentação com `search_documentation`.
2. Pedir criação de Item de Sandbox para `transactions`, via `get_sandbox_access_token`, sem webhook e sem exibir token. Confirmar a instituição retornada, sem assumir o nome.
3. Usar as ferramentas disponíveis para obter contas via `/accounts/get` e transações via `/transactions/get`. O servidor pode disponibilizar orientações para chamadas API em vez de ferramentas diretas para todos os endpoints. Confira o conjunto real de ferramentas.
4. Percorrer todas as páginas do intervalo solicitado, informando moeda, quantidade e pendências.
5. Registrar tabelas sanitizadas e três observações calculadas. Não capturar saídas brutas contendo tokens.

O token é privado. Não cole no chat do aplicativo nem no código. O site não recebe automaticamente o Item criado no cliente MCP.

## Solução de problemas

- uvx não encontrado: conferir caminho absoluto, reiniciar terminal e cliente.
- Falha de autenticação: conferir origem Sandbox e nomes das variáveis em configuração privada.
- PRODUCT_NOT_READY: aguardar atualização e tentar novamente com limite de tentativas.
- Ferramentas ausentes: conferir se o servidor iniciou e reiniciar o cliente.
- Mudanças em pacote ou cliente: consultar as fontes oficiais antes de alterar a configuração.

## Backend futuro

Segredos `PLAID_CLIENT_ID`, `PLAID_SECRET` e `PLAID_ACCESS_TOKEN` somente no servidor; host restrito a `https://sandbox.plaid.com`; sessão autenticada e autorizada; paginação completa; erros compreensíveis; sem operações de escrita. Avaliar `/transactions/sync` para integração contínua. Webhook é evolução separada.

Fontes: [Plaid oficial](https://github.com/plaid/ai-coding-toolkit/tree/main/sandbox), [Pluggy MCP](https://docs.pluggy.ai/pt/docs/developer-tools/mcp), guia DIO páginas 14–17 e 25–28. Configuração não executada nesta entrega.
