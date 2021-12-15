import { songDetails, showSongDetails, showArtist } from '../../stores';

export const musica = {
  aliases: ['music', 'song', 'stream'],
  exec: async (client, channel) => {
    const data = await(await fetch('/spotify?details')).json();
    songDetails.set(data);
    showSongDetails.set(true);
    setTimeout(() => showArtist.set(true), 7500);
    setTimeout(() => showArtist.set(false), 14000);
    setTimeout(() => showSongDetails.set(false), 15000);

    const odesli = await(await fetch(`https://api.song.link/v1-alpha.1/links?url=${data?.song?.uri}`)).json();

    client.say(channel, `🎵 Tocando agora: ${data?.artist?.name} - ${data?.song?.title} | ${odesli?.pageUrl}`);
  }
}