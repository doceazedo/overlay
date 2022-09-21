import {
  broadcast,
  isModerator,
  playGoogleTTS,
  playPollyTTS,
  replyError,
} from '../utils';
import { pollyVoices } from '../helpers';
import type { Command } from '.';

export const tts: Command = {
  aliases: ['tts'],
  exec: async (input, args, user) => {
    if (!args.length)
      return replyError(
        user,
        'veja como usar e quais vozes estão disponíveis em https://doceazedo.com/tts'
      );

    if (args[0] == 'skip') {
      if (!isModerator(user))
        return replyError(user, 'Somente mods podem usar esse comando 🤭');
      return broadcast('skipaudio');
    }

    const voiceId =
      args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();

    const isSSML = args?.[1]?.toLowerCase() == 'ssml';

    if (pollyVoices.includes(voiceId)) {
      args.shift();
      if (isSSML) args.shift();
      playPollyTTS(args.join(' '), voiceId, isSSML);
      return;
    }

    playGoogleTTS(args.join(' '), 'pt-BR');
  },
};
