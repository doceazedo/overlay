import { send } from '../utils';
import type { Command } from '.';

const offenses = [
  'quebra a cara no chão, e quebra o chão junto, cai na banheira da vizinha, morre afogade, e toma uma sentença post mortem de indenizar a vizinha por danos banheirais',
  'rola a escada de 1000 andares do templo shaolin, cai pela janela da cobertura de um rpédio de 300 andares, é atropeladu por um drone, bate de cara numa tampa de boeiro explosiva, se afoga num rio de escremento e vira geosmina pro pessoal beber',
  'toma um tombo de classe social, vira um crackudo mizeravel e fica vagando pela estação da luz dando dinheiro pra traficante que da dinheiro pra puliça corrupta que da dinheiro pra político corrupto que da compra de votos pra proletariado gado retardado que compra iphones fididos que só duram 2 dias e vão parar em lixão infectando o solo com chumbo so pra dar dinheiro pro grande capital',
  'cai na boca de um vulcão, vira currasco de resto de aborto, provoca a erupção de yellow stone que bloqueia o sol e causa a fome mundial e intoxica o nucleo do planeta, que para de funcionar e destroi o campo magnetico da terra que vaporiza toda a atmosfera e faz as bussolas dos navios transportadores de muambas quebrar e desviar as minhas muambas para o azerbaijão',
  'cai no meu conceito',
];

const getOffense = () => offenses[Math.floor(Math.random() * offenses.length)];

export const rasteira: Command = {
  aliases: [
    'rasteira',
    'banda',
    'chute',
    'puxaodetapete',
    'mostrasuaverdadeirapersonalidadevagabunda',
  ],
  exec: async (input, args, user) => {
    send(
      `@${user.username} enfia uma rasteira na cara du ${args.join(
        ' '
      )} que ${getOffense()} PunOko`
    );
  },
};
