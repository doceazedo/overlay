const baseUrl = 'https://reddit.com';

export type RedditPostVideo = {
  fallback_url: string;
  height: number;
  width: number;
  duration: number;
  is_gif: boolean;
  // ...
};

export type RedditPostPreviewImage = {
  source: {
    url: string;
    width: string;
    height: string;
  };
};

export type RedditPost = {
  data: {
    subreddit: string;
    title: string;
    secure_media?: {
      reddit_video?: RedditPostVideo;
    };
    preview: {
      images: RedditPostPreviewImage[];
    };
    author: string;
    is_video: boolean;
    pinned: boolean;
    media_embed: any;
    crosspost_parent_list: any;
    url_overridden_by_dest: string;
    // ...
  };
};

export type RedditListingResponse = {
  kind: string;
  data: {
    dist: number;
    children: RedditPost[];
    // ...
  };
};

export type RedditAboutResponse = {
  data: {
    community_icon?: string;
    icon_img?: string;
    // ...
  };
};

export const getRedditHotPosts = async (subreddit: string) => {
  const resp = await fetch(`${baseUrl}/r/${subreddit}/hot.json`);
  const data: RedditListingResponse = await resp.json();
  return data.data.children;
};

export const getRedditIcon = async (subreddit: string) => {
  const resp = await fetch(`${baseUrl}/r/${subreddit}/about.json`);
  const data: RedditAboutResponse = await resp.json();
  return data.data?.icon_img || data.data?.community_icon;
};
