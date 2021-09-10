export const projeto = {
  exec: async (client, channel, tags, args) => {
    if (tags['user-id'] == '98776633' && args.length) {
      const value = args.join(' ');
      await fetch(`/settings/projeto`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
      });

      return client.say(channel, `✅ Projeto atualizado!`);
    }

    const data = await(await fetch('/settings/projeto')).json();
    client.say(channel, data.value || 'Eita, não achei nenhum projeto! 🥴');
  }
}