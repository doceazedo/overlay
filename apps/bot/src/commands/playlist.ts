import { reply } from '../utils';
import type { Command } from '.';

export const playlist: Command = {
  aliases: ['playlist'],
  exec: async (input, args, user) => {
    reply(
      user,
      '💿🎵 pov: vc está na live do doceazedo https://open.spotify.com/playlist/1FpGHDB2xBgKA5TljZmUzI'
    );
  },
};
