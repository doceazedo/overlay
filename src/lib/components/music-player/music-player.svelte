<script lang="ts">
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { MusicPlayerCover } from '.';

  const transition = {
    duration: 200,
    opacity: 0,
    start: 0.75,
    easing: quintOut,
  };

  export let title = 'Nada tocando :(',
    artist = '',
    difficulty = '',
    cover: string;
</script>

<div class="music-player">
  <figure class="cover" transition:scale={transition}>
    {#key cover}
      <MusicPlayerCover {cover} />
    {/key}
  </figure>
  {#key title}
    <div
      class="info"
      in:scale={{ ...transition, delay: 300 }}
      out:scale={transition}
    >
      <h1>{title}</h1>
      <h2>{artist} <span>{difficulty}</span></h2>
    </div>
  {/key}
</div>

<style lang="sass">
  .music-player
    display: flex
    width: 100%
    height: 5rem
    gap: .75rem
    background-color: #242424
    border-radius: .5rem
    padding: .75rem

    .cover
      flex-shrink: 0
      height: 3.5rem
      width: 3.5rem
      border-radius: .5rem
      background-color: #2d2d2d
      transition: all .2s ease

    .info
      display: flex
      flex-direction: column
      justify-content: center

      h1,
      h2
        max-width: 22rem
        line-height: 1.25
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        transition: all .2s ease

      h1
        font-size: 1.5rem
        font-weight: 700

      h2 span
        opacity: .5
</style>
