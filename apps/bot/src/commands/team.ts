import simpleIcons from 'simple-icons';
import { reply, replyError, send } from '../utils';
import { updateUser } from '../clients/overlay';
import type { Command } from '.';

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
    const usageMsg =
      'clique em qualquer ícone do site https://doceazedo.com/icones e cole o comando aqui!';

    if (!args.length) return reply(user, usageMsg);

    const iconInput = args[0];
    const icon = iconInput && simpleIcons.Get(iconInput);

    if (!icon) return replyError(user, usageMsg);

    const userId = user['user-id'] as string;
    await updateUser(userId, { team: icon.slug });

    send(`@${user.username} mudou para equipe ${icon.title}! ✨`);
  },
};
