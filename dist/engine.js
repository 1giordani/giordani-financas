import { accounts, transactions } from './data.js';
export const money = cents => cents == null ? 'Não informado' : 'US$ ' + (cents/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
export const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function selectTransactions(filter={}) {
 return transactions.filter(t=>(!filter.account||t.account===filter.account)&&(!filter.start||t.date>=filter.start)&&(!filter.end||t.date<=filter.end)).sort((a,b)=>b.date.localeCompare(a.date));
}
export function summarize(rows) {
 const confirmed=rows.filter(t=>!t.pending), spending=confirmed.filter(t=>t.amount>0&&!t.transfer);
 const categories={}; for(const t of spending) categories[t.category]=(categories[t.category]||0)+t.amount;
 return {spending:spending.reduce((s,t)=>s+t.amount,0),outflow:confirmed.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0),inflow:confirmed.filter(t=>t.amount<0).reduce((s,t)=>s-t.amount,0),pending:rows.filter(t=>t.pending).reduce((s,t)=>s+Math.abs(t.amount),0),categories:Object.entries(categories).sort((a,b)=>b[1]-a[1]),confirmed:confirmed.length};
}
const transactionTable = rows => ({headers:['Data','Descrição / conta','Categoria','Movimento','Status'],rows:rows.map(t=>[t.date.split('-').reverse().join('/'),t.name+' · '+accounts.find(a=>a.id===t.account).name,t.category,(t.amount>0?'Saída: ':'Entrada: ')+money(Math.abs(t.amount)),t.pending?'Pendente':'Confirmada'])});
export function answer(question, filter={}) {
 const q=normalize(question), rows=selectTransactions(filter), totals=summarize(rows);
 const selected=accounts.filter(a=>!filter.account||a.id===filter.account);
 const source=`Amostra local fictícia · ${filter.start||'2026-09-28'} a ${filter.end||'2026-10-16'} · ${rows.length} registros no filtro (${totals.confirmed} confirmados). Saldos: snapshot de 16/10/2026.`;
 const result=(text,table=null)=>({text,table,source});
 if(filter.start&&filter.end&&filter.start>filter.end) return result('A data inicial precisa ser anterior ou igual à data final. Ajuste o filtro.');
 if(/transferir|pagar|pagamento de boleto|pix|emprestimo|investir/.test(q)) return result('Este assistente só consulta a amostra. Não realiza pagamentos, transferências nem contrata produtos. Tente: “mostrar saldos”.');
 if(/mcp|fonte|origem|conectado|dados reais|plaid|pluggy|como funciona/.test(q)) return result('Este chat usa uma amostra local autoral e respostas por regras, sem IA generativa ou MCP ativo. A Pluggy documenta integrações brasileiras. A Plaid Sandbox é o laboratório previsto para uma etapa futura. Nenhuma conta bancária está conectada. Abra “Sobre o projeto” para ver o caminho dos dados.');
 if(/saldo|divida|limite|disponivel/.test(q)) {
 const deposits=selected.filter(a=>a.kind==='deposit'),credit=selected.filter(a=>a.kind==='credit');
 return result(`Dinheiro disponível nas contas: ${money(deposits.reduce((s,a)=>s+(a.available||0),0))}. Dívida nos cartões: ${money(credit.reduce((s,a)=>s+a.current,0))}. Crédito disponível não é dinheiro em conta. Os saldos são snapshots e não são recalculados pelo extrato parcial.`,{headers:['Conta','Saldo atual','Disponível','Limite total'],rows:selected.map(a=>[a.name,money(a.current)+(a.kind==='credit'?' (dívida)':''),money(a.available)+(a.kind==='credit'&&a.available!=null?' (crédito)':''),money(a.limit)])});
 }
 if(/contas|minha conta|tipos de conta/.test(q)) return result('A amostra contém contas em USD. Nenhum valor foi convertido para reais.',{headers:['Conta','Tipo','Moeda'],rows:selected.map(a=>[a.name,a.type,a.currency])});
 if(!rows.length) return result('Não há transações da amostra para esse filtro. Ajuste as datas ou a conta. Isso não informa seu saldo fora da amostra.');
 if(/alimentacao|transporte|lazer|servicos/.test(q)) {
 const names=['Alimentação','Transporte','Lazer','Serviços']; const category=names.find(n=>q.includes(normalize(n)));
 const part=rows.filter(t=>t.category===category), sub=summarize(part);
 return result(`${category}: ${money(sub.spending)} de consumo confirmado, sem transferências. Pendências da categoria, em separado: ${money(sub.pending)}. ${part.length} registros na categoria.`,transactionTable(part));
 }
 if(/categoria/.test(q)) return result(`Consumo confirmado: ${money(totals.spending)}. Transferências e pendências não entram nesse total. Pendências separadas: ${money(totals.pending)}.`,{headers:['Categoria','Consumo confirmado'],rows:totals.categories.map(([name,value])=>[name,money(value)])});
 if(/padro|observac|insight|resum|gastei|gastos|moviment/.test(q)) {
 const top=totals.categories[0];
 const obs=[`1. ${top?top[0]+' lidera o consumo confirmado: '+money(top[1])+'.':'Não há consumo confirmado nesse filtro.'}`,`2. Transferências foram separadas do consumo (${rows.filter(t=>t.transfer&&!t.pending).length} registros confirmados).`,`3. Há ${rows.filter(t=>t.pending).length} registro(s) pendente(s), somando ${money(totals.pending)} em valores absolutos, fora dos totais confirmados.`];
 return result(`Consumo confirmado: ${money(totals.spending)}. Entradas confirmadas: ${money(totals.inflow)}. Saídas confirmadas: ${money(totals.outflow)} (incluem transferências).\n\n${obs.join('\n')}\n\nSão observações desta amostra; ela não permite afirmar hábitos recorrentes.`,{headers:['Categoria','Consumo confirmado'],rows:totals.categories.map(([name,value])=>[name,money(value)])});
 }
 if(/transac|extrato|ultimas|recentes/.test(q)) return result(`Mostrando ${Math.min(rows.length,/todas|extrato/.test(q)?rows.length:5)} transações, da mais recente para a mais antiga. Valor positivo na convenção Plaid indica saída; negativo, entrada.`,transactionTable(/todas|extrato/.test(q)?rows:rows.slice(0,5)));
 return result('Não consigo responder a essa pergunta com as consultas disponíveis. Posso mostrar contas, saldos, últimas transações, consumo por categoria e um resumo. Para filtrar por período ou conta, use os controles acima do chat.');
}
