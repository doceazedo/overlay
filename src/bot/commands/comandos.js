export const comandos = {
  aliases: ['cmd', 'commands', 'help', 'ajuda'],
  exec: async (client, channel) => {
    client.say(channel, `Todos os comandos estão disponíveis em: https://doceazedo.com/bot`);
  }
}