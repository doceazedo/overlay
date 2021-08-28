<script>
  let nowPlaying = {};
  let show = false;

  setInterval(async () => {
    try {
      const res = await fetch('/assets/json/song.json');
      const song = await res.json();
      if (nowPlaying.title != song.title) {
        nowPlaying = song;
        show = true;
        setTimeout(() => show = false, 10000);
      }
    } catch (e) { }
  }, 250);
</script>

<div id="music" class:show={show}>
  <img src={nowPlaying.cover} alt="">
  <div>
    <h1>{nowPlaying.title}</h1>
    <h2>{nowPlaying.artist}</h2>
  </div>
</div>

<style type="text/sass">
  @import '../sass/vars.sass'

  #music
    position: absolute
    right: 1rem
    bottom: 17rem
    height: 8rem
    width: 30rem
    display: flex
    background-color: #f7f495
    border-top-left-radius: .5rem
    border-top-right-radius: .5rem
    padding: .75rem
    padding-bottom: 1.5rem
    color: #f27581
    transition: all 1s ease

    &:not(.show)
      bottom: 9.5rem

    img
      height: 100%
      border-radius: .5rem
      margin-right: 1rem

    div
      display: flex
      flex-direction: column
      justify-content: center

      h1,
      h2
        max-width: 17rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

      h1
        font-size: 2rem
        font-weight: 700

      h2
        font-size: 1.75rem

</style>