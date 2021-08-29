<script>
  let nowPlaying = {};
  setInterval(async () => {
    try {
      const song = await(await fetch('/assets/json/song.json')).json();
      if (nowPlaying.title != song.title) nowPlaying = song;
    } catch (e) { }
  }, 250);
</script>

<div id="music">
  <img src={nowPlaying.cover} alt="">
  <div>
    <h1>{nowPlaying.title}</h1>
    <h2>{nowPlaying.artist}</h2>
  </div>
</div>

<style type="text/sass">
  #music
    display: flex
    flex-shrink: 0
    height: 6rem
    width: 100%
    background-color: #242424
    border-radius: .5rem
    padding: .75rem
    margin-bottom: 1rem

    img
      height: 100%
      border-radius: .5rem
      margin-right: .75rem

    div
      display: flex
      flex-direction: column
      justify-content: center

      h1,
      h2
        max-width: 21rem
        line-height: 1.25
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

      h1
        font-size: 1.75rem
        font-weight: 700

      h2
        font-size: 1.25rem
</style>