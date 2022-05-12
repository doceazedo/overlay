import { getRedditMemes } from '$lib/modules/memes';
import { shuffleArray } from '$lib/utils';

const subreddits = ['ShitpostBR', 'botecodoreddit', 'AgiotasClub', 'eu_nvr'];

export const get = async () => {
  const promises = subreddits.map((r) => getRedditMemes(r));
  const memesArrays = await Promise.all(promises);
  const memes = [].concat(...memesArrays);
  const shuffledMemes = shuffleArray(memes);

  return {
    body: shuffledMemes,
  };
};
