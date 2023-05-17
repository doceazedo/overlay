import { send } from '../utils';
import type { Command } from '.';

export const specs: Command = {
  aliases: ['specs', 'spec', 'config', 'pc', 'setup'],
  exec: async () => {
    send(
      'Eu programo num MacBook Pro M1 14" 2021 🧑‍💻 e jogo num Ryzen 3600X com uma GTX 1660 🎮 Mais detalhes em: https://doceazedo.com/uses'
    );
  },
};
