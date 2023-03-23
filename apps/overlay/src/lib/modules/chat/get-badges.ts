import { CHANNEL_ID } from '$lib/env';
import { parseBadges } from 'emotettv';
import type { Badges } from 'emotettv';

export const getBadges = async (badgesData: Badges) => {
  const badges = await parseBadges(badgesData, CHANNEL_ID);
  const badgesArr: string[] = [];

  for (const code in badges) {
    badgesArr.push(badges[code].image_url_1x);
  }

  return badgesArr;
};
