import {
  broadcast,
  playGoogleTTS,
  playPollyTTS,
  playTikTokTTS,
  replyError
} from '../utils';
import { modOnlyCmd } from '../middlewares';
import { pollyVoices, tikTokDefaultVoices, tikTokVoices } from '../helpers';
import type { Command } from '.';

export const tts: Command = {
  aliases: ['tts'],
  exec: async (input, args, user) => {
    // there's no message
    if (!args.length)
      return replyError(
        user,
        'veja como usar e quais vozes estão disponíveis em https://doceazedo.com/tts'
      );

    // trying to skip current tts
    if (args[0] == 'skip') return modOnlyCmd(user, () => broadcast('skipaudio'));

    // get voiceid / ssml
    let voiceId =
      args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();
    const isSSML = args?.[1]?.toLowerCase() == 'ssml';

    // handle polly voices
    if (pollyVoices.includes(voiceId)) {
      args.shift();
      if (isSSML) args.shift();
      playPollyTTS(args.join(' '), voiceId, isSSML);
      return;
    }

    // handle google voices
    voiceId = voiceId.toLowerCase();
    if (voiceId == 'google') {
      args.shift();
      playGoogleTTS(args.join(' '), 'pt-BR');
      return;
    }

    // handle tiktok voices
    if (tikTokVoices.includes(voiceId)) {
      args.shift();
    } else {
      voiceId = tikTokDefaultVoices[Math.floor(Math.random() * tikTokDefaultVoices.length)];
    }
    playTikTokTTS(args.join(' '), voiceId);
  },
};
