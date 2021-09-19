<script>
  import { scale } from 'svelte/transition';
  import { bounceOut } from 'svelte/easing';

  let nowPlaying = {};
  setInterval(async () => {
    try {
      const song = await(await fetch('/song')).json();
      if (nowPlaying.title != song.title) {
        nowPlaying = {};
        setTimeout(() => nowPlaying = song, 500);
      }
    } catch (e) { }
  }, 250);

  const fadeInCover = event => event.target.classList.add('show');
</script>

<div id="music">
  {#if nowPlaying.cover}
    <img on:load={fadeInCover} transition:scale={{duration: 200, opacity: 0, start: .75, easing: bounceOut}} src={nowPlaying.cover} alt="">
    <div transition:scale={{duration: 200, opacity: 0, start: .75, easing: bounceOut}}>
      <h1>{nowPlaying.title}</h1>
      <h2>{nowPlaying.artist}</h2>
    </div>
  {/if}
</div>

<style type="text/sass">
  #music
    display: flex
    flex-shrink: 0
    height: 5rem
    width: 100%
    background-color: #242424
    border-radius: .5rem
    padding: .75rem
    margin-bottom: 1rem

    img
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

      h1
        font-size: 1.5rem
        font-weight: 700
</style>