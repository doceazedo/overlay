<script lang="ts">
  import type { Meme } from '$lib/modules/memes';

  let iconIsLoaded = false;

  export let meme: Meme,
    progressBars = [0],
    videoEl: HTMLVideoElement,
    audioEl: HTMLAudioElement;
</script>

<main>
  <ul class="progress">
    {#each progressBars as progress}
      <li style="--width:{progress}%" />
    {/each}
  </ul>

  <header class="header">
    <figure>
      <img
        src="api/{meme.subreddit}.png"
        alt=""
        on:load={() => (iconIsLoaded = true)}
        class:show={iconIsLoaded}
      />
    </figure>
    <div class="meta">
      <p class="author">{meme.author} em <span>{meme.subreddit}</span></p>
      <p class="description">{meme.title}</p>
    </div>
  </header>

  <div class="card">
    <!-- FIXME: add background -->
    <img
      class="background"
      src={meme?.video?.thumbnailUrl || meme?.image?.url}
      alt=""
    />

    {#if !!meme.video}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        class="media"
        width="800"
        height="800"
        bind:this={videoEl}
        on:loadeddata
        on:ended
      >
        <source src={meme.video.videoUrl} type="video/mp4" />
        <audio bind:this={audioEl}>
          <source src={meme.video.audioUrl} type="audio/mpeg" />
        </audio>
      </video>
    {:else if !!meme.image}
      <img class="media" src={meme.image.url} alt="" />
    {:else}
      <p>Error: No media found.</p>
      <pre>{JSON.stringify(meme, null, 2)}</pre>
    {/if}
  </div>
</main>

<style lang="sass">
  main
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 1rem
    width: 100%
    height: 100%

  .card
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 1066px
    height: 800px
    border-radius: 1.5rem
    overflow: hidden

    .background
      position: absolute
      min-width: 1200px
      min-height: 1000px
      z-index: -1
      filter: blur(1rem) brightness(.25)

    img.media,
    video.media
      width: 100%
      height: 100%
      max-width: 1066px
      max-height: 800px

    img.media
      object-fit: contain

  .progress
    display: flex
    width: 1066px
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
        width: var(--width)
        height: 100%
        background-color: #fff
        border-radius: .5rem

  .header
    display: flex
    width: 1066px
    height: 75px
    gap: 1rem
    align-items: center

    figure,
    img
      width: 75px
      height: 75px
      border-radius: 50%

    figure
      flex-shrink: 0
      background-color: rgba(#fff, .1)

      img
        transition: all .2s ease .1s

        &:not(.show)
          opacity: 0

    .author
      color: rgba(#fff, .75)

      span
        color: #fff

    .description
      font-size: 1.5rem
</style>
