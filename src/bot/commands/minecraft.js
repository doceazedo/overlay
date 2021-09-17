export const minecraft = {
  aliases: ['mc', 'servidor', 'server'],
  exec: async (client, channel) => {
    const { isAlive } = await(await fetch('/ping-mc')).json();
    client.say(channel, `A gente tem um servidor de Minecraft 1.5.2 survival para pessoas selecionadas 💖 E ele está ${isAlive ? '🟢 ON' : '🔴 OFF'} no momento`);
  }
}