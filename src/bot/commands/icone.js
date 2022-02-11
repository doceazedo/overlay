import simpleIcons from 'simple-icons';

export const icone = {
  aliases: ['icon', 'badge', 'team', 'time', 'equipe'],
  exec: async (client, channel, tags, args) => {
    const iconInput = args.join(' ').toLowerCase();
    const icon = iconInput && simpleIcons.Get(iconInput);

    if (!iconInput || !icon) {
      client.say(channel, `/color Red`);
      client.say(channel, `/me @${tags.username}, clique em qualquer ícone do site https://doceazedo.com/icones e coloque o comando aqui!`);
      return;
    }

    await fetch(`/users/${tags['user-id']}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        team: icon.slug
      })
    });

    client.say(channel, `@${tags.username} mudou para equipe ${icon.title}!`);
  }
}