import { broadcast } from '../utils';
import type { Command } from '.';

const videoUrl = '/assets/video/odeiopc.mp4';

export const odeiopc: Command = {
  aliases: ['odeiopc', 'odeiojs', 'odeioreact', 'nala'],
  exec: async () => broadcast('playvideo', videoUrl),
};
