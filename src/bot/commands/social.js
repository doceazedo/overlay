export const social = {
  aliases: ['socials', 'redes', 'github'],
  exec: async (client, channel) => {
    client.say(channel, `/color DodgerBlue`);
    client.say(channel, `/me 🐙 GitHub: https://github.com/doceazedo`);

    client.say(channel, `/color BlueViolet`);
    client.say(channel, `/me 🐤 Twitter: https://twitter.com/doceazedo911`);

    client.say(channel, `/color DodgerBlue`);
    client.say(channel, `/me 📸 Instagram: https://instagram.com/doceazedo911`);

    client.say(channel, `/color BlueViolet`);
    client.say(channel, `/me 💬 Discord: https://discord.gg/vEGRe2kq8B`);

    client.say(channel, `/color DodgerBlue`);
    client.say(channel, `/me 🎵 Lastfm: https://last.fm/user/doceazedo911`);

    client.say(channel, `/color BlueViolet`);
    client.say(channel, `/me 💼 Polywork: https://polywork.com/doceazedo`);
  }
}