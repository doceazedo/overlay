<script lang="ts">
  import { onMount } from 'svelte';
  import { decodeHtml } from '$lib/utils';
  import { MediaPlayer } from '$lib/components';
  import { getMemes } from '$lib/services/memes';
  import { MEDIAPLAYER_PLAYBACK, mediaImageDuration } from '.';
  import type { RedditPost } from '$lib/services/reddit';
  import type { Media } from '.';

  const subreddits = [
    'ShitpostBR',
    'botecodoreddit',
    'AgiotasClub',
    'MemesBrasil',
    'eu_nvr',
  ];
  const secondsToTwice = 20;
  const secondsToThrice = 6;

  let posts: RedditPost[] = [];
  let media: Media;
  let isFirstMedia = true;
  let progressBars = [false];

  let audio: HTMLAudioElement;
  let video: HTMLVideoElement;

  const playMedia = () => {
    progressBars[media.totalPlays - media.plays] = true;

    video.currentTime = 0;
    video.play();

    if (!media.isGif) {
      audio.currentTime = 0;
      audio.volume = 0.1;
      audio.play();
    }

    media.plays--;
  };

  const handleOnLoaded = () => {
    const isVideoReady = video.readyState >= 3;
    // const isAudioReady = media.isGif ? true : audio.readyState >= 3;
    if (!isVideoReady) return;

    playMedia();
  };

  const handleOnEnded = () => {
    if (media.plays <= 0) return getNextMedia();
    playMedia();
  };

  const getNextMedia = () => {
    !isFirstMedia ? posts.shift() : (isFirstMedia = false);
    const nextPost = posts[0].data;

    media = {
      src:
        nextPost?.secure_media?.reddit_video?.fallback_url ||
        nextPost?.url_overridden_by_dest ||
        nextPost?.preview?.images?.[0]?.source?.url,
      isVideo: nextPost.is_video,
      isGif: nextPost?.secure_media?.reddit_video?.is_gif,
      duration: nextPost?.secure_media?.reddit_video?.duration,
      plays: 1,
      totalPlays: 1,
      background: decodeHtml(nextPost.preview.images[0].source.url),
      author: nextPost.author,
      subreddit: nextPost.subreddit,
      title: nextPost.title,
      icon: `/api/r/${nextPost.subreddit}.png`,
    };

    if (media.isVideo) {
      const duration = nextPost.secure_media.reddit_video.duration;
      // FIXME: feio
      media.plays = duration <= secondsToTwice ? 2 : 1;
      media.plays = duration <= secondsToThrice ? 3 : media.plays;
      media.totalPlays = media.plays;

      progressBars = Array(media.plays).fill(false);

      return;
    }

    progressBars = [false];
    setTimeout(() => (progressBars = [true]), 100);
    setTimeout(getNextMedia, mediaImageDuration);
  };

  const play = () => {
    video.play();
    if (!media.isGif) audio.play();
  };

  const pause = () => {
    video.pause();
    if (!media.isGif) audio.pause();
  };

  MEDIAPLAYER_PLAYBACK.subscribe((playback) => {
    if (playback === null) return;
    playback ? play() : pause();
  });

  onMount(async () => {
    posts = await getMemes(subreddits);
    getNextMedia();
  });
</script>

{#if media}
  {#key media.src}
    <MediaPlayer
      {media}
      {progressBars}
      bind:audio
      bind:video
      on:loadeddata={handleOnLoaded}
      on:ended={handleOnEnded}
      on:click={getNextMedia}
    />
  {/key}
{/if}
