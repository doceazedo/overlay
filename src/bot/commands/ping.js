export const ping = {
  aliases: ['foo'],
  exec: async (client, channel, tags) => {
    client.say(channel, `@${tags.username}, pong!`);
  }
}