import { json } from '@sveltejs/kit';
import { getRedditMemes } from '$lib/modules/memes';
import { shuffleArray } from '$lib/utils';

const subreddits = ['ShitpostBR', 'botecodoreddit', 'AgiotasClub', 'eu_nvr'];

export const GET = async () => {
  const promises = subreddits.map((r) => getRedditMemes(r));
  const memesArrays = await Promise.all(promises);
  const memes = [].concat(...memesArrays);
  const shuffledMemes = shuffleArray(memes);

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  // return json(shuffledMemes);
  return {
    body: shuffledMemes,
  };
};
