import { pollyVoices } from '../../helpers';
import playTTS from '../play-tts';

export const tts = {
  exec: async (client, channel, tags, args) => {
    if (!args.length) {
      client.say(channel, `/color Red`);
      client.say(channel, `/me @${tags.username}, veja como usar e quais vozes estão disponíveis em https://doceazedo.com/tts`);
      return;
    }

    let voiceID = args[0].charAt(0).toUpperCase() + args[0].slice(1).toLowerCase();
    let provider = 'gcp';

    if (pollyVoices.includes(voiceID)) {
      args.shift();
      provider = 'aws';
    };

    if (voiceID == 'Perola') {
      args.shift();
      provider = 'cybervox';
    }

    playTTS(provider, args.join(' '), voiceID);
  }
}