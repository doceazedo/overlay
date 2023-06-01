import { broadcast } from '../utils';
import type { Command } from '.';

const videoUrl = '/assets/video/larissamanoela.mp4';

export const larissamanoela: Command = {
  aliases: [
    'larissamanoela',
    'larissa',
    'bug',
    'lag',
    'lagou',
    'bitrate',
    'claro',
    'claronet',
    'baleiou',
    'caiu',
  ],
  exec: async (input, args, user) => broadcast('playvideo', videoUrl),
};
