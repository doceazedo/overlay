<script lang="ts">
  import { mediaImageDuration } from '$lib/modules';
  import type { Media } from '$lib/modules';

  export let media: Media,
    progressBars = [false],
    audio: HTMLAudioElement,
    video: HTMLVideoElement;

  const duration = media.duration ? media.duration * 1000 : mediaImageDuration;
</script>

<ul class="progress">
  {#each progressBars as load}
    <li style="--duration: all {duration}ms linear" class:load>
      {progressBars}
    </li>
  {/each}
</ul>

<header class="header">
  <img src={media.icon} alt="" />
  <div class="meta">
    <p class="author">{media.author} em <span>r/{media.subreddit}</span></p>
    <p class="description">{media.title}</p>
  </div>
</header>

<div class="card">
  <img class="background" src={media.background} alt="" />

  {#if media.isVideo}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      class="media"
      width="800"
      height="800"
      bind:this={video}
      on:loadeddata
      on:ended
    >
      <source src={media.src} type="video/mp4" />
      <audio bind:this={audio} on:loadeddata>
        {#if !media.isGif}
          <source
            src={media.src.replace(/(?<=DASH_)(.*)(?=.mp4)/gm, 'audio')}
            type="audio/mpeg"
          />
        {/if}
      </audio>
    </video>
  {:else}
    <img class="media" src={media.src} alt="" />
  {/if}
</div>
<button on:click>Next</button>

<style lang="sass">
  .card
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 800px
    height: 800px
    border-radius: .5rem
    overflow: hidden

    .background
      position: absolute
      min-width: 1000px
      min-height: 1000px
      z-index: -1
      filter: blur(1rem) brightness(.25)

    img.media,
    video.media
      max-width: 800px
      max-height: 800px

  .progress
    display: flex
    width: 800px
    gap: .5rem

    li
      height: .5rem
      flex-grow: 1
      background-color: rgba(#fff, .1)
      border-radius: .5rem
      overflow: hidden

      &::before
        content: ''
        display: block
        width: 0
        height: 100%
        background-color: #fff
        border-radius: .5rem
        transition: var(--duration)

      &.load::before
        width: 100%

  .header
    display: flex
    width: 800px
    gap: 1rem
    align-items: center

    img
      width: 4rem
      height: 4rem
      border-radius: 50%

    .author
      color: rgba(#fff, .75)

      span
        color: #fff

    .description
      font-size: 1.5rem
</style>
