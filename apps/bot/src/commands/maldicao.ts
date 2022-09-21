import { send } from '../utils';
import type { Command } from '.';

const offenses = [
  'ser afogade num tanque cheio de tubarões por um psicopata gostoso yandere que canta bem que não aceita o fim da relação',
  'virar um proletariade que trabalha numa mina de amianto pra ganhar um pacote de doritos por dia pra alimentar a esposa e 300 filhos enquanto nada numa represa de lama tóxica da mineradora over rica que não liga pra elu.',
  'tomar um rojão nuclear no meio do C# e sair voando até a orbita de netuno batendo em cada lixo espacial que a humanidade fidida tacou no ceu pra atropelar os pombos',
  'passar os próximos 300 séculos programando em java',
  'ser elu mesme.',
  'a se casar comigo',
  'passar a vida inteira procurando o amor da vida delu sem se tocar que nem a mãe delu u ama',
  'cair na malha fina da receita federal',
  'tirar foto pro instagram sem maquiagem nem photoshop',
  'parar de se iludir e acordar para a verdade sobre a vida e o universo e nunca mais se iludir',
  'nunca mais na vida usar calmantes não regulamentados pela anvisa',
  'cursar a faculdade de novo',
  'virar saco de pancada de canguru boxeador viciado em anabolizantes esteroidados',
  'convencer a aws a cobrar menos de 10 USD / mes pra rodar as coisas delu',
  'ser amaldiçoado',
];

const getOffense = () => offenses[Math.floor(Math.random() * offenses.length)];

export const maldicao: Command = {
  aliases: ['maldicao', 'praga', 'coisaruim', 'ritual'],
  exec: async (input, args, user) => {
    send(`${args.join(' ')} foi amaldiçoade a ${getOffense()} PunOko`);
  },
};
