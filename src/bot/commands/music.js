export const music = {
  aliases: ['song', 'musica'],
  exec: async (client, channel) => {
    const song = await(await fetch('/song')).json();
    client.say(channel, `🎵 Tocando agora: ${song.artist} - ${song.title}`);
  }
}