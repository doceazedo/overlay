import { broadcast } from '../utils';
import type { Command } from '.';

const videoUrl = '/assets/video/chuu-nome.mp4';

export const chuu: Command = {
  aliases: ['chuu', 'chuudoloona', 'chuuexloona', 'chuudo'],
  exec: async () => broadcast('playvideo', videoUrl),
};
