import { reply, replyError } from '../utils';
import type { Command } from '.';
import { trpc } from 'trpc-client';

type SongQueueEntry = {
  userID: string;
  track: SpotifyApi.SingleTrackResponse;
};

export const virtualQueue: SongQueueEntry[] = [];

export const sr: Command = {
  aliases: ['sr', 'songrequest', 'enfileirar'],
  exec: async (input, args, user) => {
    if (!args.length)
      return replyError(
        user,
        'informe o título, ID ou URL do Spotify da música'
      );

    const track = await trpc.spotifyWebApi.findFirstTrack.query({
      query: args.join(' '),
    });
    if (!track)
      return replyError(
        user,
        'não achei essa música no Spotify :/ Tem certeza de que o título, ID ou URL estão corretos?'
      );

    const userID = user['user-id'] || 'unknown';
    virtualQueue.push({ userID, track });

    setTimeout(() => {
      const isSongQueued = virtualQueue.find(
        (item) => item.userID === userID && item.track.id === track.id
      );

      if (!isSongQueued) return;

      trpc.spotifyWebApi.queueTrack.query({ uri: track.uri });
      virtualQueue.splice(virtualQueue.indexOf(isSongQueued), 1);
    }, 10000);

    reply(
      user,
      `${track.artists[0].name} - ${track.name} foi enfileirado 🕺🪩 Use !remover para remover da fila :)`
    );
  },
};
