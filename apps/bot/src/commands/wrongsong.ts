import { reply, replyError } from '../utils';
import type { Command } from '.';
import { virtualQueue } from './sr';

export const wrongsong: Command = {
  aliases: [
    'wrongsong',
    'cancel',
    'cancelar',
    'errei',
    'ws',
    'remove',
    'remover'
  ],
  exec: async (input, args, user) => {
    const queuedSongs = virtualQueue.filter((item) => user['user-id'] === item.userID)
    const lastQueuedSong = queuedSongs[queuedSongs.length - 1];

    if (!lastQueuedSong) {
      replyError(user, 'você não tem músicas na fila ou o tempo para removê-la já passou 😬');
      return;
    }

    const track = lastQueuedSong.track;
    virtualQueue.splice(virtualQueue.indexOf(lastQueuedSong), 1)
    reply(user, `a música ${track.artists[0].name} - ${track.name} foi removida 👌`);
  },
};
