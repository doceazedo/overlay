<script lang="ts">
  import type { Media } from '$lib/modules';

  let iconIsLoaded = false;

  export let media: Media,
    progressBars = [0],
    audio: HTMLAudioElement,
    video: HTMLVideoElement,
    debug = false;
</script>

<main>
  <ul class="progress">
    {#each progressBars as progress}
      <li style="--width:{progress}%">
        {progressBars}
      </li>
    {/each}
  </ul>

  <header class="header">
    <figure>
      <img
        src={media.icon}
        alt=""
        on:load={() => (iconIsLoaded = true)}
        class:show={iconIsLoaded}
      />
    </figure>
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

  {#if debug}
    <button on:click>Next</button>
  {/if}
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
    border-radius: .5rem
    overflow: hidden

    .background
      position: absolute
      min-width: 1200px
      min-height: 1000px
      z-index: -1
      filter: blur(1rem) brightness(.25)

    img.media,
    video.media
      max-width: 1066px
      max-height: 800px

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
