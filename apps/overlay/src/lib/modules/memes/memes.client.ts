import { decodeHtml } from '$lib/utils';
import type {
  RedditHotPostsResponse,
  RedditAboutResponse,
  PostData,
  Meme,
  MemeImage,
  MemeVideo,
} from '.';

const redditBaseUrl = 'https://reddit.com';
const apiBaseUrl = '/api';

export const getSubredditHotPosts = async (subreddit: string) => {
  try {
    const resp = await fetch(`${redditBaseUrl}/r/${subreddit}/hot.json`);
    const data: RedditHotPostsResponse = await resp.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getSubredditIcon = async (subreddit: string) => {
  try {
    const resp = await fetch(`${redditBaseUrl}/r/${subreddit}/about.json`);
    const data: RedditAboutResponse = await resp.json();
    return data.data?.icon_img || data.data?.community_icon;
  } catch (error) {
    return null;
  }
};

export const getRedditMemes = async (subreddit: string) => {
  const data = await getSubredditHotPosts(subreddit);
  const posts = data?.data?.children;
  if (!posts) return [];

  const memes: Meme[] = posts
    .map((children) => {
      const postData = children.data;
      if (postData.pinned || postData.stickied) return;

      const metadata = {
        title: postData.title,
        author: postData.author_fullname,
        subreddit: postData.subreddit_name_prefixed,
      };

      const video = tryGetVideo(postData);
      if (video) return { video, ...metadata };

      const image = tryGetImage(postData);
      if (image) return { image, ...metadata };
    })
    .filter((meme) => !!meme);

  return memes;
};

export const getMemes = async () => {
  try {
    const resp = await fetch(`${apiBaseUrl}/memes`);
    const data: Meme[] = await resp.json();
    return data;
  } catch (error) {
    return [];
  }
};

const tryGetVideo = (post: PostData): MemeVideo => {
  const video =
    post?.secure_media?.reddit_video ||
    post?.crosspost_parent_list?.[0]?.secure_media?.reddit_video;
  const videoUrl = video?.fallback_url;
  if (!videoUrl) return null;
  const audioUrl = videoUrl.replace(/(?<=DASH_)(.*)(?=.mp4)/gm, 'audio');
  const thumbnailUrl = post?.thumbnail;
  return {
    videoUrl,
    audioUrl,
    thumbnailUrl,
  };
};

const tryGetImage = (post: PostData): MemeImage => {
  let url =
    post?.preview?.images?.[0]?.source?.url ||
    post?.crosspost_parent_list?.[0]?.preview?.images?.[0]?.source?.url;
  if (!url) return null;
  url = decodeHtml(url);
  return {
    url,
  };
};
