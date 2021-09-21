import * as commands from './commands';
import playTTS from './play-tts';

export const bot = client => {
  client.on('message', (channel, tags, message, self) => {
    if (tags['custom-reward-id'] && tags['custom-reward-id'] == '0d3a213a-1af8-4c47-a0ba-cadfea2300c0') return playTTS('gcp', message);
    if (tags['custom-reward-id'] && tags['custom-reward-id'] == 'f2eab451-e128-4889-b367-61b83c002dbc') return playTTS('aws', message);

    if (self || !message.startsWith('!')) return;
    const args = message.split(' ');
    const input = args.shift().substring(1).toLowerCase();

    if (input in commands) {
      client.say(channel, `/color SpringGreen`);
      commands[input].exec(client, channel, tags, args);
      return;
    }

    for (const i in commands) {
      if (commands[i].aliases && commands[i].aliases.includes(input)) {
        client.say(channel, `/color SpringGreen`);
        commands[i].exec(client, channel, tags, args);
        return;
      }
    }

    // client.say(channel, `/color Red`);
    // client.say(channel, `/me @${tags.username}, não conheço esse comando (${input}) []! 😔`);
  });
}