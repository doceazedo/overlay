import type { RedditPost } from './reddit';

const baseUrl = '/api';

export const getMemes = async (subreddits: string[]) => {
  const subsStr = subreddits.join(',');
  const resp = await fetch(`${baseUrl}/memes?subreddits=${subsStr}`);
  const data: RedditPost[] = await resp.json();
  return data;
};
