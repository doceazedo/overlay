import { reply, replyError } from '../utils';
import { queueSong, searchSong } from '../clients/overlay';
import type { Command } from '.';

type SongQueueEntry = {
  userID: string;
  trackID: string;
};

const virtualQueue: SongQueueEntry[] = [];

export const sr: Command = {
  aliases: ['sr', 'songrequest', 'enfileirar'],
  exec: async (input, args, user) => {
    if (!args.length) return replyError(user, 'informe o título, ID ou URL do Spotify da música');

    const track = await searchSong(args.join(' '));
    if (!track) return replyError(user, 'não achei essa música no Spotify :/ Tem certeza de que o título, ID ou URL estão corretos?');

    const userID = user['user-id'] || 'unknown';
    virtualQueue.push({ userID, trackID: track.id });
    
    setTimeout(() => {
      const isSongQueued = virtualQueue.find(item => item.userID === userID && item.trackID === track.id);
      
      if (!isSongQueued) return;

      queueSong(track.uri);
      virtualQueue.splice(virtualQueue.indexOf(isSongQueued), 1);
    }, 10000);

    

    reply(user, `${track.artists[0].name} - ${track.name} foi adicionado na fila 🕺🪩`);
  },
};
