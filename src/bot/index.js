import * as commands from './commands';

export const bot = client => {
  client.on('message', (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) return;
    const input = message.substring(1);
    const args = message.split(' ').shift();

    if (input in commands) {
      client.say(channel, `/color SpringGreen`);
      commands[input].exec(client, channel, tags, args);
      return;
    }

    for (const i in commands) {
      if (commands[i].aliases.includes(input)) {
        client.say(channel, `/color SpringGreen`);
        commands[i].exec(client, channel, tags, args);
        return;
      }
    }

    client.say(channel, `/color Red`);
    client.say(channel, `/me @${tags.username}, não conheço esse comando! 😔`);
  });
}