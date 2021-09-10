export const pronomes = {
  aliases: ['pronome', 'pronoun', 'pronouns'],
  exec: async (client, channel, tags, args) => {
    let [ primary, secondary ] = args;

    if (args[0].split('/').length == 2) [ primary, secondary ] = args[0].split('/');

    const primaryPronouns   = [  'ele',  'ela',  'elu' ];
    const secondaryPronouns = [ 'dele', 'dela', 'delu' ];
    
    if (!primary || !primaryPronouns.includes(primary) || (secondary && !primaryPronouns.includes(secondary) && !secondaryPronouns.includes(secondary))) {
      client.say(channel, `/color Red`);
      client.say(channel, `/me @${tags.username}, você pode mandar um ou dois pronomes separados por espaço 😉 As opções são "ela", "ele" e "elu"`);
      return;
    }

    if (!secondary) secondary = `d${primary}`;
    if (primaryPronouns.includes(secondary)) secondary = `d${secondary}`;

    await fetch(`/users/${tags['user-id']}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pronouns: `${primary}/${secondary}`
      })
    });

    client.say(channel, `@${tags.username}, vou me lembrar que seus pronomes são ${primary}/${secondary} 🥰`);
  }
}