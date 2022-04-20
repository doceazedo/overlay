import { getRedditHotPosts } from '$lib/clients/reddit';
import { matchYoutubeUrl, shuffleArray } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import type { RedditPost } from '$lib/clients/reddit';

export const get: RequestHandler = async ({ url }) => {
  const subreddits = url.searchParams.get('subreddits').split(',');
  let filteredPosts: RedditPost[] = [];

  for (const subreddit of subreddits) {
    const posts = await getRedditHotPosts(subreddit);
    filteredPosts = [...filteredPosts, ...posts.slice(1)];
  }

  filteredPosts = filteredPosts.map((post) => {
    if (post?.data?.crosspost_parent_list?.length)
      return {
        ...post,
        data: {
          ...post.data,
          ...post?.data?.crosspost_parent_list[0],
        },
      };

    return post;
  });

  filteredPosts = filteredPosts.filter((post) => {
    if (!post?.data?.media_embed) return;
    if (post?.data?.secure_media?.reddit_video?.duration > 120) return;
    if (!post?.data?.preview?.images.length) return;
    if (matchYoutubeUrl(post?.data?.url_overridden_by_dest)) return;

    return true;
  });

  return {
    body: shuffleArray(filteredPosts),
  };
};
