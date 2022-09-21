import { send } from '../utils';
import type { Command } from '.';

export const dog: Command = {
  aliases: ['dog', 'cachorro', 'cachorra', 'cadela', 'cao', 'cão', 'panda'],
  exec: async () => {
    send('A cachorrinha aí atrás é uma vira-lata chamada Panda! 🐶🐼');
  },
};
