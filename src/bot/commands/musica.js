import { get } from 'svelte/store';
import {
  songDetails,
  showSongDetails,
  showArtist,
  isPlayingOsu } from '../../stores';

export const musica = {
  aliases: ['music', 'song', 'stream'],
  exec: async (client, channel) => {
    if (get(showSongDetails)) return;

    const osu = get(isPlayingOsu) ? '&osu' : '';
    const data = await(await fetch(`/song?details${osu}`)).json();
    songDetails.set(data);
    showSongDetails.set(true);
    setTimeout(() => showArtist.set(true), 5000);
    setTimeout(() => showArtist.set(false), 14000);
    setTimeout(() => showSongDetails.set(false), 15000);

    const url = data?.song?.link || `https://song.link/s/${data?.song?.id}`

    client.say(channel, `🎵 Tocando agora: ${data?.artist?.name} - ${data?.song?.title} | ${url}`);
  }
}