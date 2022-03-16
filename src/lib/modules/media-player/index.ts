export type Media = {
  src: string;
  isVideo: boolean;
  isGif: boolean;
  duration?: number;
  plays?: number;
  totalPlays?: number;
  background: string;
  author: string;
  subreddit: string;
  title: string;
  icon: string;
};

export * from './media-player.store';
export { default as MediaPlayer } from './media-player.svelte';
