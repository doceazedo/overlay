export const ping = {
  aliases: ['foo'],
  exec: (client, channel, tags) => {
    client.say(channel, `@${tags.username}, pong!`);
  }
}