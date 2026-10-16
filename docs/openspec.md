# OpenSpec — Giordani Finanças

Prompt adaptado para reprodução no Lovable. Esta versão foi implementada com Codex/Sites; o prompt não foi enviado ao Lovable.

## Proposta
Criar um app de chat chamado Giordani Finanças, em português brasileiro, para estudar consultas financeiras com dados fictícios. Entregar primeiro a Etapa 1 local. Não pedir credenciais.

## Experiência
Layout responsivo com navegação de conversas, nova conversa, indicação permanente “Demonstração · Dados fictícios”, referência 16/10/2026 e USD. Tema escuro verde profundo com texto bege e acentos dourados. Chat como foco, com caixa de mensagem no rodapé, envio por Enter, quebra por Shift+Enter, sugestões funcionais e estado de carregamento. Explicar que as respostas são locais, por regras, sem IA generativa.

## Dados
Quatro contas fictícias: corrente 110/100 USD (atual/disponível); poupança 210/200; cartão com 410 de dívida e disponível ausente; cartão empresarial com 5.020 de dívida, 4.980 de crédito disponível e 10.000 de limite. Criar uma amostra pequena autoral de transações coerentes entre 28/09 e 16/10/2026; identificá-la como autoral. Não atribuir a amostra a uma consulta API que não aconteceu.

## Requisitos
- Listar contas, tipos e moeda.
- Separar dinheiro, dívida, crédito disponível e limite.
- Mostrar cinco transações recentes e extrato.
- Agrupar consumo por categoria.
- Filtrar consultas por conta e datas explícitas nos controles.
- Separar pendências, entradas e saídas e excluir transferências do consumo.
- Informar origem, intervalo e número de registros nas respostas.
- Fazer cálculos em código com centavos inteiros, não inventar valores.
- Tratar perguntas sem suporte, dados vazios e datas invertidas.
- Histórico neste navegador, nova conversa e exclusão de histórico.
- Nenhuma operação bancária de escrita, segredo no frontend ou falsa conexão ativa.

## Arquitetura
Isolar dataset, motor de cálculo e apresentação. Etapa 2 futura: backend interpreta intenção, autoriza sessão, consulta Plaid Sandbox com segredos no servidor, pagina transações, calcula e responde. Manter essa etapa como pendente até haver evidência.

## Cenários de aceite
- Saldo disponível nos depósitos = US$ 300,00; dívida de cartões = US$ 5.430,00.
- A amostra completa tem consumo confirmado US$ 354,40, sem transferências e pendência.
- Cartão de crédito com disponível ausente exibe “Não informado”.
- Alimentação no intervalo 01/10–16/10 = US$ 194,50 confirmado, mais US$ 12,50 pendente em separado.
- Sugestões enviam perguntas reais; branco não é enviado; pergunta desconhecida não inventa resposta.
- Os controles, tabelas e caixa de mensagem devem ser utilizáveis no celular.

## Revisões incorporadas
Separação explícita de snapshots e extrato parcial, indicação de painel completo vs. filtro do chat, origem local, perguntas por regras, limites de histórico e testes numéricos independentes.
