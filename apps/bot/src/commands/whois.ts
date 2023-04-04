import { replyError, send } from '../utils';
import type { Command } from '.';
import { getUser } from '../clients';
import { targetOrMeCmd } from '../middlewares';

export const whois: Command = {
  aliases: ['whois'],
  exec: (input, args, user) =>
    targetOrMeCmd(args, user, async (target, self) => {
      const userData = await getUser(target);
      const pronouns = `el${userData?.pronouns?.substring(3, 2) || 'u'}`;
  
      const isUnknown = !userData?.team && !userData?.pronouns;
      const hasTeamOnly = userData?.team && !userData?.pronouns;
      const hasPronounsOnly = userData?.pronouns && !userData?.team;
  
      if (isUnknown)
        return replyError(
          user,
          `eu ainda não conheço essa pessoa muito bem... 🤔`
        );
  
      if (hasTeamOnly)
        return send(`${userData?.displayName} é do time #${userData?.team}!`);
  
      if (hasPronounsOnly)
        return send(
          `Os pronomes de ${userData?.displayName} são ${userData?.pronouns}, mas ${pronouns} ainda não faz parte de nenhum time!`
        );
  
      send(
        `Os pronomes de ${userData?.displayName} são ${userData?.pronouns} e ${pronouns} é do time #${userData?.team}!`
      );
    })
};
