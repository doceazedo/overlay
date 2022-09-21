import { send } from '../utils';
import type { Command } from '.';

type Tronco = {
  size: number;
  message: string;
};

const troncos = new Map<string, Tronco>();

const randomNumber = () => Math.floor(Math.random() * (30 - 1) + 1);

const getMessage = (size: number) => {
  if (size < 5) return 'pipico piquitito BibleThump';
  if (size < 10) return 'faz um esforço que fica aceitavel VoHiYo';
  if (size < 13) return 'médio KonCha';
  if (size < 16) return 'uie... TehePelo';
  if (size < 20) return 'maior que o meu PunOko';
  if (size < 25) return 'bem maior que o meu NotLikeThis';
  if (size < 28) return 'aberração genetica imensa... PogChamp';
  return 'parabéns... você passou da minha regua... ta feliz? eu não to não... some daqui, vai';
};

const makeTronco = (): Tronco => {
  const size = randomNumber();
  const message = getMessage(size);
  return { size, message };
};

const getTronco = (username = '') => {
  if (troncos.has(username)) return troncos.get(username);
  const tronco = makeTronco();
  troncos.set(username, tronco);
  return tronco;
};

export const tronco: Command = {
  aliases: [
    'tronco',
    'geba',
    'giromba',
    'jamanta',
    'pika',
    'bengaladokid',
    'britadeira',
    'trozoba',
    'pipico',
    'anaconda',
    'trambolha',
    'baqueta',
  ],
  exec: async (input, args, user) => {
    const tronco = getTronco(user.username);
    send(
      `@${user.username} tem ${tronco?.size}cm de tronco ${tronco?.message}`
    );
  },
};
