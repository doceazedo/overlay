import { send } from '../utils';
import type { Command } from '.';

const offenses = [
  'vai a nocaute beijando o chão com muito amor',
  'sai voando, entra em orbita, bate com a cara na estação espacial e abre um buraco novo na lua',
  'voa de cara na menina feia e psicopata, da um beijo nela e é forçado a se casar com ela e viver sofrendo para sempre',
  'perde um dente da boca que cai no esgoto, vira geosmina, para na baia de guanabara, é comido por um peixe mutante que é vendido na feira que é encontrado pelo rei salomão que oferece como tributo para a fada do dente e usa a grana para recomprar o reino perdido de nosgorth',
  'vai a nocaute e perde o UFC - ultimate fapping contest',
];

const getOffense = () => offenses[Math.floor(Math.random() * offenses.length)];

export const punch: Command = {
  aliases: ['punch', 'soco', 'bate', 'knockout'],
  exec: async (input, args, user) => {
    send(
      `@${user.username} enfia um socão na cara de ${args.join(
        ' '
      )} que ${getOffense()} PunOko BOP`
    );
  },
};
