import * as simpleIcons from 'simple-icons';
import { reply, replyError, send } from '../utils';
import { updateUser } from '../clients/overlay';
import type { Command } from '.';

const iconsMap = new Map(Object.entries(simpleIcons).map(([_, icon]) => [icon.slug, icon]));

export const team: Command = {
  aliases: [
    'team',
    'time',
    'equipe',
    'icone',
    'icones',
    'icon',
    'icons',
    'badge',
  ],
  exec: async (input, args, user) => {
    if (!args.length) return reply(user, 'escolha um ícone em https://doceazedo.com/icones e cole o comando aqui! ✨');

    const iconInput = args[0];
    const icon = iconsMap.get(iconInput);

    if (!icon) return replyError(user, 'não achei esse ícone! 😳 Você pode escolher um em https://doceazedo.com/icones');

    const userId = user['user-id'] as string;
    await updateUser(userId, { team: icon.slug });

    send(`@${user.username} mudou para equipe ${icon.title}! ✨`);
  },
};
