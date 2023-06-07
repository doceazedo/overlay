import { trpc } from 'trpc-client';
import { broadcast, send } from '../utils';
import type { Command } from '.';
import 'dotenv/config';

export const song: Command = {
  aliases: ['song', 'music', 'stream', 'musica'],
  exec: async () => {
    broadcast('cmd:song');
    const song = await trpc.spotifyApp.getTrack.query();
    if (!song) return send('🔇 Nada tocando agora...');
    const url = `https://song.link/s/${song.track.id}`;
    send(
      `🎵 Tocando agora: ${song.artist.name} - ${song.track.title} | ${url}`
    );
  },
};
