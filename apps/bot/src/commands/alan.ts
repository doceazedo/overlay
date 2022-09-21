import { broadcast, send } from '../utils';
import type { Command } from '.';
import { playPollyTTS } from '../utils/play-tts';

export const alan: Command = {
  aliases: ['alan', 'alanturing'],
  exec: async (input, args, user) => {
    broadcast('cmd:alan');
    send(
      `@${user.username} agradeceu à Alan Turing (1912 - 1954), ateu, homossexual e pai da ciencia da computação 🙏🏳‍🌈`
    );
    playPollyTTS(
      'obrigado alan toring pai do computação obrigado obrigado',
      'Ricardo'
    );
  },
};
