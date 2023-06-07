import { json } from '@sveltejs/kit';
import { getRedditMemes } from '$lib/modules/memes';
import { shuffleArray } from '$lib/utils';

const subreddits = ['ProgrammerHumor'];

export const GET = async () => {
  const promises = subreddits.map((r) => getRedditMemes(r));
  const memesArrays = await Promise.all(promises);
  const memes = [].concat(...memesArrays);
  const shuffledMemes = shuffleArray(memes);
  return json(shuffledMemes);
};
