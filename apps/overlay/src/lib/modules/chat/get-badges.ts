import { CHANNEL_ID } from '$lib/env';
import { parseBadges } from 'emotettv';

export const getBadges = async (badgesData: any) => {
  const badges = await parseBadges(badgesData, {
    channelId: CHANNEL_ID
  });
  const badgesArr = badges.toMinimalArray().map(badge => badge[1]);
  return badgesArr;
};
