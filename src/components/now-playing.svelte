<script>
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { songDetails, showSongDetails, showArtist } from '../stores';

  let nowPlaying = {};
  setInterval(async () => {
    try {
      const song = await(await fetch('/spotify')).json();
      if (nowPlaying.title != song.title) {
        nowPlaying = {};
        setTimeout(() => nowPlaying = song, 500);
      }
    } catch (e) { }
  }, 2500);

  const fadeInCover = event => event.target.classList.add('show');
</script>

<div id="music" class:details={$showSongDetails}>
  {#if nowPlaying.cover}
    <img class="cover" on:load={fadeInCover} transition:scale={{duration: 200, opacity: 0, start: .75, easing: quintOut}} src={nowPlaying.cover} alt="">
    <div transition:scale={{duration: 200, opacity: 0, start: .75, easing: quintOut}}>
      <h1>{nowPlaying.title}</h1>
      <h2>{nowPlaying.artist}</h2>
    </div>

    {#if $songDetails}
      <div class="artist" class:show={$showArtist}>
        <figure class="artist-image">
          <img src={$songDetails?.artist?.image} alt="">
        </figure>
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

    .artist
      position: absolute
      top: 19px

      &-image
        display: flex
        height: 16rem
        width: 16rem
        border-radius: .5rem
        overflow: hidden

        img
          height: 16rem
          width: 16rem
          margin-left: 16rem
          transition: all .5s ease

      &.show img
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