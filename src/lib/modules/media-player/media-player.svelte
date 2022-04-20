<script lang="ts">
  import { onMount } from 'svelte';
  import { decodeHtml } from '$lib/utils';
  import { MediaPlayer } from '$lib/components';
  import { getMemes } from '$lib/clients/memes';
  import { MEDIAPLAYER_PLAYBACK } from '.';
  import type { RedditPost } from '$lib/clients/reddit';
  import type { Media } from '.';

  const fps = 60;
  const subreddits = ['ShitpostBR', 'botecodoreddit', 'AgiotasClub', 'eu_nvr'];
  const secondsToTwice = 20;
  const secondsToThrice = 6;
  const mediaImageDuration = 10000;

  let posts: RedditPost[] = [];
  let media: Media;
  let isFirstMedia = true;
  let progressBars = [0];

  let audio: HTMLAudioElement;
  let video: HTMLVideoElement;

  const playMedia = () => {
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

      progressBars = Array(media.plays).fill(0);

      return;
    }

    progressBars = [0];
  };

  const updateProgressBar = () => {
    if (media == null) return;

    if (video != null) {
      const i = media.totalPlays - media.plays - 1;
      progressBars[i] = (video.currentTime / video.duration) * 100;
      return;
    }

    if (progressBars[0] >= 100) return getNextMedia();
    progressBars[0] += 1000 / fps / (mediaImageDuration / 100);
  };
  setInterval(updateProgressBar, 1000 / fps);

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
      debug={true}
    />
  {/key}
{/if}
