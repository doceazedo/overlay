import { send } from '../utils';
import type { Command } from '.';

const offenses = [
  'achar que react é mais legal que svelte',
  'que eu quis',
  'ser trouxa',
  'testar em prod',
  'dar delete sem where',
  'não agradescer ao allan turing',
  'ser coach vampiro quantico relativistico oscilatorio vibracional elastico escalavel business for enterprises blockchain de kubernetes com javascript versão python',
  'roubar vaquinhas da minha fazenda do minecraft',
  'usar a privada entupida',
  'dar skip na musica boa',
  'soltar pum em baixo da coberta',
  'dormir roncando no meio da reunião com o microfone aberto',
  'fumar cigarro no posto de gasolina',
  'ter jogado 30 bitcoins no lixo em 2008',
  'falar o nome da amante enquanto dorme com mozão',
  'mostrar o txt com as senhas enquanto faz live',
  'comitar o .env',
  'fazer deploy na sexta a noite',
  'acordar cedo no fim de semana para trabalhar',
  'sugerir hora extra pro patrão',
  'reclamar com a professora que a prova que a turma toda tirou 2 tava fácil',
  'achar que java é orientado a objetos',
  'dar spoiler de série do merdiflix',
  'tomar virus porque abriu o fotos_quentes_do_bbb.apk',
  'formatar o pc sem fazer backup',
  'ser programador(a) de uma única linguagem de programação',
  'fazer framework de 20 Gb que depende da internet inteira pra implementar uma função de print',
  'hackear o servidor du amiguinhe sem acobertar o próprio IP',
  'proibir ssh no firewall e se trancar fora do próprio servidor',
  'deletar a system32',
  'usar o thanosJS de dependência do programinha da empresa',
  'pedir por serviços clandestinos no grupinho de hackers',
];

const getOffense = () => offenses[Math.floor(Math.random() * offenses.length)];

export const ban: Command = {
  aliases: ['ban', 'kick', 'bane', 'somedaqui'],
  exec: async (input, args, user) => {
    send(`${args.join(' ')} levou ban por ${getOffense()} PunOko`);
  },
};
