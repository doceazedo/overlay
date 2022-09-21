<script lang="ts">
  import { onMount } from 'svelte';
  import { MemesViewer } from '$lib/components/memes-viewer';
  import { getMemes } from './memes.client';
  import type { Meme } from './memes.types';

  export const playPause = () => {
    isPlaying = !isPlaying;
    if (!!meme.video) {
      videoEl.pause();
      audioEl.pause();
    }
  };

  export const getNextMeme = (shift = true) => {
    if (shift) memes.shift();
    meme = memes[0];
    if (!!meme.image) progressBars = Array(1).fill(0);
  };

  const fps = 60;
  const mediaImageDuration = 10000;

  let memes: Meme[] = [];
  let meme: Meme;
  let videoEl: HTMLVideoElement;
  let audioEl: HTMLAudioElement;
  let progressBars = [0];
  let currentBar = 0;
  let isPlaying = true;

  const onVideoLoaded = () => {
    const duration = videoEl.duration;
    switch (true) {
      case duration <= 6:
        progressBars = Array(3).fill(0);
        break;
      case duration <= 20:
        progressBars = Array(2).fill(0);
        break;
      default:
        progressBars = Array(1).fill(0);
        break;
    }

    playVideo();
  };

  const playVideo = () => {
    videoEl.currentTime = 0;
    audioEl.currentTime = 0;
    videoEl.play();
    audioEl.play();
  };

  const updateProgressBar = () => {
    if (progressBars[currentBar] >= 100) {
      currentBar = progressBars.findIndex((x) => x == 0);
      if (currentBar < 0) currentBar = 0;

      if (!!currentBar && !!meme.video) return playVideo();
      if (!currentBar) return getNextMeme();
    }

    if (!!meme.video)
      return (progressBars[currentBar] =
        (videoEl.currentTime / videoEl.duration) * 100);

    if (!!meme.image && isPlaying)
      return (progressBars[currentBar] +=
        1000 / fps / (mediaImageDuration / 100));
  };

  onMount(async () => {
    memes = await getMemes();
    getNextMeme(false);
    setInterval(updateProgressBar, 1000 / fps);
  });
</script>

{#if meme}
  <MemesViewer
    {meme}
    {progressBars}
    bind:audioEl
    bind:videoEl
    on:loadeddata={onVideoLoaded}
  />
{/if}
