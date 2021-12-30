<script>
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let song = null,
             showDetails = false,
             songDetails = null,
             showArtist = false;

  const fadeInCover = event => event.target.classList.add('show');
</script>

<div id="music" class:details={showDetails}>
  {#if song?.cover}
    <img class="cover" on:load={fadeInCover} transition:scale={{duration: 200, opacity: 0, start: .75, easing: quintOut}} src={song?.cover} alt="">
    <div transition:scale={{duration: 200, opacity: 0, start: .75, easing: quintOut}}>
      <h1>{song?.title}</h1>
      <h2>
        {song?.artist}
        {#if song?.suffix}
          <span>{song?.suffix}</span>
        {/if}
      </h2>
    </div>

    {#if songDetails}
      <div class="artist" class:show={showArtist}>
        <div class="artist-image">
          <figure style="background-image:url({songDetails?.artist?.image})"></figure>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style type="text/sass">
  #music
    position: relative
    display: flex
    flex-shrink: 0
    height: 5rem
    width: 100%
    background-color: #242424
    border-radius: .5rem
    padding: .75rem
    margin-bottom: 1rem
    transition: all .2s ease
    z-index: 1

    .cover
      height: 3.5rem
      width: 3.5rem
      border-radius: .5rem
      margin-right: .75rem
      transition: all .2s ease

      &:not(.show)
        opacity: 0

    div
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

    .artist
      position: absolute
      top: 19px

      &-image
        display: flex
        height: 16rem
        width: 16rem
        border-radius: .5rem
        overflow: hidden

        figure
          height: 16rem
          width: 16rem
          margin-left: 16rem
          background-position: center
          background-repeat: no-repeat
          background-size: cover
          transition: all .4s ease

      &.show figure
        margin-left: 0

    &.details
      flex-direction: column
      justify-content: center
      align-items: center
      height: 25rem
      overflow: hidden

      .cover
        height: 16rem
        width: 16rem
        margin-bottom: 1rem
        margin-right: 0

      h1,
      h2
        text-align: center
        max-width: 27rem

      h1
        font-size: 2.5rem

      h2
        font-size: 2rem
</style>