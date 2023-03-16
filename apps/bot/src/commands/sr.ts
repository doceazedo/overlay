import { reply, replyError } from '../utils';
import { queueSong } from '../clients/overlay';
import type { Command } from '.';

export const sr: Command = {
  aliases: ['sr', 'songrequest', 'enfileirar'],
  exec: async (input, args, user) => {
    if (!args.length) return replyError(user, 'informe o título, ID ou URL do Spotify da música');

    const track = await queueSong(args.join(' '));
    if (!track) return replyError(user, 'não achei essa música no Spotify :/ Tem certeza de que o título, ID ou URL estão corretos?');

    reply(user, `${track.artists[0].name} - ${track.name} foi adicionado na fila 🕺🪩`);
  },
};
