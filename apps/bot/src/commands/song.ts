import { trpc } from 'trpc-client';
import { broadcast, send } from '../utils';
import type { Command } from '.';
import 'dotenv/config';

export const song: Command = {
  aliases: ['song', 'music', 'stream', 'musica'],
  exec: async () => {
    broadcast('cmd:song');
    const song = await trpc.spotify.getTrack.query();
    if (!song) send('🔇 Nada tocando agora...');
    const url = `https://song.link/s/${song.song.id}`;
    send(`🎵 Tocando agora: ${song.artist.name} - ${song.song.title} | ${url}`);
  },
};
