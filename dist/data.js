// Amostra autoral fictícia. Não extraída de uma chamada Plaid.
export const reference = '2026-10-16';
export const accounts = [
 {id:'checking',name:'Plaid Checking',type:'Conta corrente',kind:'deposit',currency:'USD',current:11000,available:10000,limit:null},
 {id:'saving',name:'Plaid Saving',type:'Poupança',kind:'deposit',currency:'USD',current:21000,available:20000,limit:null},
 {id:'credit',name:'Plaid Credit Card',type:'Cartão de crédito',kind:'credit',currency:'USD',current:41000,available:null,limit:null},
 {id:'business',name:'Plaid Business Credit Card',type:'Cartão empresarial',kind:'credit',currency:'USD',current:502000,available:498000,limit:1000000}
];
// amount em centavos: positivo = saída; negativo = entrada.
// Saldos são snapshots independentes: o extrato é parcial e não reconcilia o saldo.
export const transactions = [
 {id:'t01',date:'2026-10-16',account:'checking',name:'Café da Praça',category:'Alimentação',amount:1250,pending:true,transfer:false},
 {id:'t02',date:'2026-10-15',account:'credit',name:'Mercado Aurora',category:'Alimentação',amount:8500,pending:false,transfer:false},
 {id:'t03',date:'2026-10-14',account:'checking',name:'Transporte urbano',category:'Transporte',amount:2400,pending:false,transfer:false},
 {id:'t04',date:'2026-10-13',account:'business',name:'Licença de software',category:'Serviços',amount:4990,pending:false,transfer:false},
 {id:'t05',date:'2026-10-12',account:'checking',name:'Restaurante Jardim',category:'Alimentação',amount:4200,pending:false,transfer:false},
 {id:'t06',date:'2026-10-10',account:'checking',name:'Transferência recebida',category:'Transferência',amount:-20000,pending:false,transfer:true},
 {id:'t07',date:'2026-10-10',account:'saving',name:'Transferência enviada',category:'Transferência',amount:20000,pending:false,transfer:true},
 {id:'t08',date:'2026-10-09',account:'credit',name:'Cinema Central',category:'Lazer',amount:3000,pending:false,transfer:false},
 {id:'t09',date:'2026-10-08',account:'checking',name:'Pagamento de salário',category:'Renda',amount:-250000,pending:false,transfer:false},
 {id:'t10',date:'2026-10-05',account:'credit',name:'Mercado Aurora',category:'Alimentação',amount:6750,pending:false,transfer:false},
 {id:'t11',date:'2026-10-03',account:'checking',name:'Transporte urbano',category:'Transporte',amount:1800,pending:false,transfer:false},
 {id:'t12',date:'2026-09-28',account:'credit',name:'Restaurante Jardim',category:'Alimentação',amount:3800,pending:false,transfer:false}
];
