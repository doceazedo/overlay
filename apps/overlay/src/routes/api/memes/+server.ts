import { json } from '@sveltejs/kit';
import { getRedditMemes } from '$lib/modules/memes';
import { shuffleArray } from '$lib/utils';

const subreddits = ['botecodoreddit', 'AgiotasClub', 'eu_nvr', 'ProgrammerHumor'];

export const GET = async () => {
  const promises = subreddits.map((r) => getRedditMemes(r));
  const memesArrays = await Promise.all(promises);
  const memes = [].concat(...memesArrays);
  const shuffledMemes = shuffleArray(memes);
  return json(shuffledMemes);
};
